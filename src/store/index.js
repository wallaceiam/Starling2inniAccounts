import Vue from 'vue'
import Vuex from 'vuex'
import Papa from "papaparse"

import { upload } from '../services/file-upload.service'

Vue.use(Vuex);

const STATUS_INITIAL = 0,
    STATUS_SAVING = 1,
    STATUS_SUCCESS = 2,
    STATUS_FAILED = 3;

export default new Vuex.Store({
    state: {
        csvData: null,
        csvFileName: null,
        uploadedFiles: [],
        uploadError: null,
        currentStatus: STATUS_INITIAL
    },
    getters: {
        isInitial: (state) => state.currentStatus === STATUS_INITIAL,
        isSaving: (state) => state.currentStatus === STATUS_SAVING,
        isSuccess: (state) => state.currentStatus === STATUS_SUCCESS,
        isFailed: (state) => state.currentStatus === STATUS_FAILED
    },
    mutations: {
        saving(state) {
            state.currentStatus = STATUS_SAVING
            state.uploadedFiles = [];
            state.uploadError = null;
            state.csvData = null;
            state.csvFileName = null;
        },
        reset(state) {
            state.currentStatus = STATUS_INITIAL
            state.uploadedFiles = [];
            state.uploadError = null;
            state.csvData = null;
            state.csvFileName = null;
        },
        uploadSuccess(state, payload) {
            const { x, data, fileName } = payload;
            state.uploadedFiles = [].concat(x);
            state.csvData = data;
            state.csvFileName = fileName;
            //this.$emit('file-uploaded', x);
            state.currentStatus = STATUS_SUCCESS;
        },
        uploadError(state, res) {
            state.uploadError = res;
            state.currentStatus = STATUS_FAILED;
        }
    },
    actions: {
        filesChanged({ commit, state }, payload) {

            commit('saving');
            const { fieldName, fileList } = payload;
            // handle file changes
            const formData = new FormData();

            if (!fileList.length) {
                commit('reset');
                return;
            }

            // append the files to FormData
            Array.from(Array(fileList.length).keys()).map(x => {
                formData.append(fieldName, fileList[x], fileList[x].name);
            });

            // upload data to the server
            upload(formData)
                .then(x => {
                    const file = x[0];
                    const csv = file.id;
                    const fileName = file.fileName;
                    var results = Papa.parse(csv, {
                        header: true,
                        dynamicTyping: true
                    });
                    const data = (results.data || [])
                        .filter(x => x.Date !== null)
                        .map(x => {
                            // Date	Counter Party	Reference	Type	Amount (GBP)	Balance (GBP)
                            const date = x["Date"];
                            const counterParty = x["Counter Party"];
                            const reference = x["Reference"];
                            const amount = x["Amount (GBP)"];
                            const balance = x["Balance (GBP)"];
                            return {
                                Date: date,
                                Description: !reference
                                    .toLowerCase()
                                    .startsWith(counterParty.toLowerCase())
                                    ? `${counterParty} ${reference}`
                                    : counterParty,
                                "Paid In": amount > 0 ? amount : undefined,
                                "Paid Out": amount < 0 ? amount * -1 : undefined,
                                Balance: balance
                            };
                        });

                    commit('uploadSuccess', { x, data, fileName: fileName.replace("Starling", "inniAccount") });
                })
                .catch(err => {
                    commit('uploadError', err.response);
                });
        },
        reset({ commit }) {
            commit('reset');
        }
    }
})

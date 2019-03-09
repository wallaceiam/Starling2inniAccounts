<template>
    <div id="file-upload">
        <div class="container">
            <!--UPLOAD-->
            <form enctype="multipart/form-data" novalidate>
                <div class="dropbox">
                    <input
                        type="file"
                        :name="uploadFieldName"
                        :disabled="isSaving"
                        @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                        accept=".csv"
                        class="input-file"
                    >
                    <p v-if="!isSaving">Drag your file here to begin
                        <br>or click to browse
                    </p>
                    <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'FileUpload',
    data () {
        return {
            uploadFieldName: 'csvFiles'
        };
    },
    computed: {
        ...mapGetters(['isSaving'])
    },
    methods: {
        reset () {
            this.$store.dispatch('reset');
        },
        save (formData) {},
        filesChange (fieldName, fileList) {
            this.$store.dispatch('filesChanged', { fieldName, fileList });
        }
    },
    mounted () {
        this.reset();
    }
};
</script>

<!-- SASS styling -->
<style lang="css">
.dropbox {
    outline-offset: -10px;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
}

.input-file {
    opacity: 0; /* invisible but it's there! */
    width: 90%;
    height: 200px;
    position: absolute;
    cursor: pointer;
}

/* .dropbox:hover {
} */

.dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
}
</style>

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
/* eslint-disable */
import { upload } from "./../services/file-upload.service";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  name: "FileUpload",
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "csvFiles"
    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  methods: {
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;

      upload(formData)
        .then(x => {
          this.uploadedFiles = [].concat(x);
          this.$emit('file-uploaded', x);
          this.currentStatus = STATUS_SUCCESS;
        })
        .catch(err => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map(x => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });

      // save it
      this.save(formData);
    }
  },
  mounted() {
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

.dropbox:hover {
  
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
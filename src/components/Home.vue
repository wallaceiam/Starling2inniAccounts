<template>
  <div class="hello">
    <h1>Welcome to Starling 2 inniAccounts</h1>
    <div v-if="csvData === undefined">
      <h2>Your Starling CSV</h2>
      <file-upload v-on:file-uploaded="fileUploaded"/>
    </div>
    <div v-else>
      <h2>Your inniAccounts CSV</h2>
      {{ csvFileName }}
      <button v-on:click="exportCSV">Export</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import FileUpload from "./FileUpload";
import Papa from "papaparse";
import Vue from "vue";

export default {
  name: "Home",
  data: () => ({ text: "", csvData: undefined, csvFileName: undefined }),
  components: {
    FileUpload
  },
  methods: {
    fileUploaded: function(x) {
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

      this.$nextTick(function() {
        this.csvData = data;
        this.csvFileName = fileName.replace("Starling", "inniAccount");
      });
    },
    exportCSV: function() {
      let csvContent = "data:text/csv;charset=utf-8,";
      const data = this.csvData;
      csvContent += [
        Object.keys(data[0]).join(";"),
        ...data.map(item => Object.values(item).join(";"))
      ]
        .join("\n")
        .replace(/(^\[)|(\]$)/gm, "");

      const href = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", href);
      link.setAttribute("download", this.csvFileName);
      link.click();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

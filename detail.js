Vue.createApp({
  data() {
    return {
      eraList: window.eraList,
      expandedEra: null,
    };
  },
  methods: {
    toggleEto(name) {
      this.expandedEra = this.expandedEra === name ? null : name;
    },
    getEtoYears(era) {
      const result = [];
      const startIndex = etoList.findIndex((e) => e.name === era.startEto);
      if (startIndex === -1) return result;
      for (
        let year = era.startYear;
        year <= (era.endYear || era.startYear);
        year++
      ) {
        const idx = (startIndex + (year - era.startYear)) % 60;
        const etoObj = etoList[idx];
        result.push({
          year,
          gengouYear: year - era.startYear + 1,
          etoName: etoObj.name,
          etoYomi: etoObj.Etoyomi,
        });
      }
      return result;
    },
    goToList() {
      window.location.href = "index.html";
    },
  },
}).mount("#app");

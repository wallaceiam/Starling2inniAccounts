export const StarlingHandler = {
  canConvert: header => {
    return !(
      header["Date"] === undefined ||
      header["Counter Party"] === undefined ||
      header["Reference"] === undefined ||
      header["Amount (GBP)"] === undefined ||
      header["Type"] === undefined ||
      header["Balance (GBP)"] === undefined
    );
  },
  convert: resultSet => {
    return resultSet
      .filter(x => x.Date !== null)
      .map(x => {
        // Date, Counter Party, Reference, Type, Amount (GBP), Balance (GBP)
        const date = x["Date"];
        const counterParty = x["Counter Party"];
        const reference = x["Reference"];
        const amount = x["Amount (GBP)"];
        const balance = x["Balance (GBP)"];
        return {
          Date: date,
          Description: reference && reference.length > 0 ?
            `${counterParty} (${reference.replace(/(\s\s+)/g, ' ').replace(/,/g, '')})` : counterParty,
          "Paid In": amount > 0 ? amount : undefined,
          "Paid Out": amount < 0 ? amount * -1 : undefined,
          Balance: balance
        };
      })
      .sort((a, b) => {
        // sort desc
        return (new Date(b.Date) - new Date(a.Date)) * -1;
      });
  }
};

const parseDateStr = date => {
  const parts = date.split("/");
  return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
};

export const VirginBusinessHandler = {
  canConvert: header => {
    return !(
      header["Date"] === undefined ||
      header["Details"] === undefined ||
      header["Money out"] === undefined ||
      header["Money in"] === undefined ||
      header["Balance"] === undefined
    );
  },
  convert: resultSet => {
    return resultSet
      .filter(x => x.Date !== null)
      .map(x => {
        // Date	Details	Money out	Money in	Balance
        const date = x["Date"];
        const details = x["Details"];
        const inflow = x["Money in"];
        let outflow = x["Money out"];
        if(outflow && +outflow < 0) {
            outflow = +outflow * -1;
        }
        const balance = x["Balance"];
        return {
          Date: date,
          Description: details,
          "Paid In": inflow || undefined,
          "Paid Out": (outflow || undefined),
          Balance: balance
        };
      })
      .sort((a, b) => {
        // sort desc
        return (parseDateStr(b.Date) - parseDateStr(a.Date)) * -1;
      });;
  },
};


export const cleanizeContents = (csv) => {
  const lines = csv.split('\n'); // lines is an array of strings

  var newCsv = '';
  var readDate = false;
  // Loop through all lines
  for (var i = 0; i < lines.length; i++) {
    const line = lines[i] || '';
    if (readDate && line.length > 0 && line.trimEnd() !== ',,,,') {
      newCsv += `\n${line}`;
    } else {
      readDate = false;
    }
    if (line.includes('Date,')) {
      readDate = true;
      newCsv = `${line}`;
    }

  }
  return newCsv;
};

let json = {
  fund_grant_associations: [
    {
      attributes: {
        type: "Fund_Grant_Association__c",
        url:
          "/services/data/v42.0/sobjects/Fund_Grant_Association__c/a0r3k000006WZ5KAAW",
      },
      Grant_Amount__c: 100,
      Grant_Date__c: "2021-12-28",
      Fund__r: {
        attributes: {
          type: "npsp__General_Accounting_Unit__c",
          url:
            "/services/data/v42.0/sobjects/npsp__General_Accounting_Unit__c/a0e3k00000R3lf0AAB",
        },
        Fund_ID__c: "MOLLY",
      },
      CombinedAttachments: null,
    },
    {
      attributes: {
        type: "Fund_Grant_Association__c",
        url:
          "/services/data/v42.0/sobjects/Fund_Grant_Association__c/a0r3k000006WZ5uAAG",
      },
      Grant_Amount__c: 10000,
      Grant_Date__c: "2020-12-28",
      Fund__r: {
        attributes: {
          type: "npsp__General_Accounting_Unit__c",
          url:
            "/services/data/v42.0/sobjects/npsp__General_Accounting_Unit__c/a0e3k00000R3lf0AAB",
        },
        Fund_ID__c: "MOLLY",
      },
      CombinedAttachments: null,
    },
  ],
};
let newArr = json.fund_grant_associations.sort((a, b) => {
  return b.Grant_Date__c - a.Grant_Amount__c;
});
console.log(newArr);

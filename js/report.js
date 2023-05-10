const Report =
  "<h3>Report</h3><div class='demo-container'><div id='gridReport'></div></div>";

const ShowReportTable = () => {
  $("#MainContainer").empty();
  $("#MainContainer").append(Report);

  $("#gridReport").dxDataGrid({
    dataSource: reportDataSource,
    remoteOperations: { groupPaging: true },
    allowColumnResizing: true,
    toolbar: {
        items: [{
            widget: 'dxButton', 
            options: {
                icon: 'refresh',
                onClick: function() { 
                    $("#gridReport").dxDataGrid("instance").refresh();
  
                }
            }
        }]
    },
    //keyExpr: "id",
    paging: {
      pageSize: 5,
    },
    pager: {
      showPageSizeSelector: true,
      allowedPageSizes: [5, 10, 20, 100],
    },
    showBorders: true,
    headerFilter: {
      visible: true,
    },
    filterPanel: {
      visible: true,
    },
    filterRow: {
      visible: false,
    },
    export: {
      enabled: true,
      allowExportSelectedData: true,
    },
    onExporting(e) {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Customers");

      DevExpress.excelExporter
        .exportDataGrid({
          component: e.component,
          worksheet,
          autoFilterEnabled: true,
        })
        .then(() => {
          workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(
              new Blob([buffer], { type: "application/octet-stream" }),
              "Customers.xlsx"
            );
          });
        });
      e.cancel = true;
    },
    
    columns: [
      {
        dataField: "id",
        width: 50,
      },
      {
        dataField: "customer",
        width: 150,
      },
      {
        dataField: "dateOfCall",
        width: 160,
      },
      {
        dataField: "timeOfCall",
        width: 100,
      },
      {
        dataField: "subject",
        width: 350,
      },
      {
        dataField: "description",
        width: 350,
      },
    ],
    showBorders: true,
  });
};

var reportDataSource = new DevExpress.data.CustomStore({
  key: "id",
  loadMode: "raw",
  load: (loadOptions) => {
    return $.getJSON(UrlAPI + "/report", loadOptions);
  },

  key: "id",
  loadOptions: {},
});

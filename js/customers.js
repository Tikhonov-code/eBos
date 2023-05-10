const containerCustomers =
  "<h3>Customers</h3><div class='demo-container'><div id='gridCustomers'></div></div>";

const ShowCustomersTable = () => {
  $("#MainContainer").empty();
  $("#MainContainer").append(containerCustomers);

  const gridCustomers = $("#gridCustomers").dxDataGrid({
    dataSource: customerDataSource,
    remoteOperations: { groupPaging: true },
    //keyExpr: "id",
    paging: {
      pageSize: 5,
    },
    pager: {
      showPageSizeSelector: true,
      allowedPageSizes: [5, 10, 20, 100],
    },
    showBorders: true,
    editing: {
      allowAdding: true,
      allowUpdating: true,
      allowDeleting: true,
      selectTextOnEditStart: true,
      useIcons: true,
    },
    toolbar: {
      items: [
        {
          location: "after",
          widget: "dxButton",
          options: {
            icon: "refresh",
            onClick() {
              $("#gridCustomers").dxDataGrid("refresh");
            },
          },
        },
        {
          location: "after",
          widget: "dxButton",
          options: {
            icon: "add",
            onClick() {
              $("#gridCustomers").dxDataGrid("instance").addRow();
            },
          },
        },
        {
          location: "export",
          widget: "dxButton",
          options: {
            icon: "exportxlsx",
            text: "Export Data",
            onClick() {
              var workbook = new ExcelJS.Workbook();    
              var worksheet = workbook.addWorksheet("SheetName");    
              DevExpress.excelExporter.exportDataGrid({
                component: $("#gridCustomers").dxDataGrid("instance"),
                worksheet: worksheet
              }).then(function() {
                workbook.xlsx.writeBuffer().then(function(buffer) {
                  saveAs(new Blob([buffer], { type: "application/octet-stream" }), "gridCustomers.xlsx");
                });
              });
           },
          },//---------------
        },
      ],
    },
    headerFilter: {
      visible: true,
    },
    filterPanel: {
      visible: true,
    },
    filterRow: {
      visible: true,
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
        allowEditing: false,
      },
      {
        dataField: "name",
        width: 350,
      },
      {
        dataField: "surname",
        width: 350,
      },
      {
        dataField: "address",
        width: 150,
      },
      {
        dataField: "postCode",
        width: 150,
      },
      {
        dataField: "country",
        width: 150,
      },
      {
        dataField: "dateofbirth",
        width: 350,
      },
    ],
    showBorders: true,
  });
};

var customerDataSource = new DevExpress.data.CustomStore({
  key: "id",
  loadMode: "raw",
  load: (loadOptions) => {
    return $.getJSON(UrlAPI + "/customers", loadOptions);
  },

  byKey: (key) => {
    return $.getJSON(UrlAPI + "/" + encodeURIComponent(key));
  },

  insert: (values) => {
    return $.ajax({
      url: UrlAPI + "/insertcustomer",
      method: "POST",
      data: JSON.stringify(values),
      contentType: "application/json",
    });
  },

  update: (key, values) => {
    return $.ajax({
      url: UrlAPI + "/updatecustomer/" + encodeURIComponent(key),
      method: "PUT",
      data: JSON.stringify(values),
      contentType: "application/json",
    });
  },

  remove: (key) => {
    return $.ajax({
      url: UrlAPI + "/deletecustomer/" + encodeURIComponent(key),
      method: "DELETE",
    });
  },
  key: "id",
  loadOptions: {},
});

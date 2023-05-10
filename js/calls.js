const containerCalls =
  "<h3>Calls</h3><div class='demo-container'><div id='gridCalls'></div></div>";

const ShowCallsTable = () => {
  $("#MainContainer").empty();
  $("#MainContainer").append(containerCalls);
  
  $("#gridCalls").dxDataGrid({
    dataSource: callsDataSource,
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
      const worksheet = workbook.addWorksheet("Employees");

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
              "Employees.xlsx"
            );
          });
        });
      e.cancel = true;
    },
    toolbar: {
      items: [
        {
          location: "after",
          widget: "dxButton",
          options: {
            icon: "refresh",
            onClick() {
              $("#gridCalls").dxDataGrid("refresh");
            },
          },
        },
        {
          location: "after",
          widget: "dxButton",
          options: {
            icon: "add",
            onClick() {
              $("#gridCalls").dxDataGrid("instance").addRow();
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
              DevExpress.excelExporter
                .exportDataGrid({
                  component: $("#gridCalls").dxDataGrid("instance"),
                  worksheet: worksheet,
                })
                .then(function () {
                  workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(
                      new Blob([buffer], { type: "application/octet-stream" }),
                      "gridCalls.xlsx"
                    );
                  });
                });
            },
          }, //---------------
        },
      ],
    },
    remoteOperations: true,
    columns: [
      {
        dataField: "id",
        width: 50,
        allowEditing: false,
      },
      {
        dataField: "customerId",
        caption: "Full Name",
        width: 350,
        lookup: {
          dataSource: customerList,
          //  new DevExpress.data.CustomStore({
          //  key: "id",
          //  loadMode: "raw",
          //  load: (loadOptions) => {
          //    return $.getJSON(UrlAPI + "/customersList", loadOptions);
          //  },
          //}),
          valueExpr: "id",
          displayExpr: "fullname",

        },
      },
      {
        dataField: "dateOfCall",
        width: 150,
      },
      {
        dataField: "timeOfCall",
        width: 150,
      },
      {
        dataField: "subject",
        width: 150,
      },
      {
        dataField: "description",
        width: 350,
      },
    ],
    showBorders: true,
  });
};

var callsDataSource = new DevExpress.data.CustomStore({
  key: "id",
  loadMode: "raw",
  load: (loadOptions) => {
    return $.getJSON(UrlAPI + "/calls", loadOptions);
  },

  byKey: (key) => {
    return $.getJSON(UrlAPI + "/" + encodeURIComponent(key));
  },

  insert: (values) => {
    return $.ajax({
      url: UrlAPI + "/insertcall",
      method: "POST",
      data: JSON.stringify(values),
      contentType: "application/json",
    });
  },

  update: (key, values) => {
    return $.ajax({
      url: UrlAPI + "/updatecall/" + encodeURIComponent(key),
      method: "PUT",
      data: JSON.stringify(values),
      contentType: "application/json",
    });
  },

  remove: (key) => {
    return $.ajax({
      url: UrlAPI + "/deletecall/" + encodeURIComponent(key),
      method: "DELETE",
    });
  },
  key: "id",
  loadOptions: {},
});


const customerList = new DevExpress.data.CustomStore({
  key: "id",
  loadMode: "raw",
  load: (loadOptions) => {
    return $.getJSON(UrlAPI + "/customersList", loadOptions);
  },
});
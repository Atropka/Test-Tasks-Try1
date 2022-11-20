import React from "react";
import {
  GanttComponent,
  TaskFieldsModel,
  ColumnDirective,
  ColumnsDirective,
  Toolbar,
  Inject,
  PdfExport,
} from "@syncfusion/ej2-react-gantt";
import "./App.css";
import { projectData } from "./data";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
import { pdfExportComplete } from "@syncfusion/ej2-grids";

function App() {
  let ganttInst: GanttComponent | null;

  const taskValues: TaskFieldsModel = {
    id: "TaskID",
    name: "TaskName",
    startDate: "StartDate",
    endDate: "EndDate",
    duration: "Duration",
    child: "subtasks",
  };
  const subb = taskValues.child?.length;

  const remoteData: DataManager = new DataManager({
    url: "http://82.202.204.94/tmp/test.php",
    adaptor: new WebApiAdaptor(),
  });

  const toolbarBtnClick = (args: any) => {
    if (args.item.id.includes("pdfexport")) {
      (ganttInst as GanttComponent).pdfExport();
    }
  };

  return (
    <div>
      <GanttComponent
        ref={(gantt) => (ganttInst = gantt)}
        dataSource={projectData}
        taskFields={taskValues}
        toolbar={["PdfExport"]}
        allowPdfExport={true}
        toolbarClick={toolbarBtnClick}
        labelSettings={{ rightLabel: "TaskName" }}
      >
        <Inject services={[Toolbar, PdfExport]}></Inject>
        <ColumnsDirective>
          <ColumnDirective field="TaskName" headerText="Work item" />
          <ColumnDirective field="subb" headerText="Sub Tasks" />
        </ColumnsDirective>
      </GanttComponent>
    </div>
  );
}

export default App;

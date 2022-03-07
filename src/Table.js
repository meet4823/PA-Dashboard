import "./App.css";
import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";
import Grid from "@mui/material/Grid";
import Card from "./Card";

import i1 from "./images/process.png";
import i2 from "./images/approved.png";
import i3 from "./images/draft.png";
import i4 from "./images/rejected.png";
let divs = [];
function showNameCount(data) {
  divs = [];
  let unique = data
    .map((item) => item.name)
    .filter((value, index, self) => self.indexOf(value) === index);

  const result = unique.map((u) => data.filter((d) => d.name === u).length);

  const projects = [
    {
      photo: { i1 },
      text: "first project",
      imgName: "i1",
    },
    {
      photo: { i2 },
      text: "second project",
      imgName: "i2",
    },
    {
      photo: { i3 },
      text: "third project",
      imgName: "i3",
    },
    {
      photo: { i4 },
      text: "third project",
      imgName: "i4",
    },
  ];

  const images = projects.map((project) => project.photo);

  for (let i = 0; i < result.length; i++) {
    divs.push({
      Name: unique[i],
      Value: result[i],
      Image: images[i],
      ImgName: projects[i].imgName,
    });
  }
  console.log(unique);
  console.log(divs);
}

function TablePage() {
  const url = "http://localhost:3000/students";
  const [data, setData] = useState([]);
  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = () => {
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => setData(resp));
  };

  const columns = [
    {
      title: "Name",
      field: "name",
      validate: (rowData) =>
        rowData.name === undefined || rowData.name === "" ? "Required" : true,
    },
    {
      title: "Email",
      field: "email",
      validate: (rowData) =>
        rowData.email === undefined || rowData.email === "" ? "Required" : true,
    },
    {
      title: "Year",
      field: "year",
      validate: (rowData) =>
        rowData.year === undefined || rowData.year === "" ? "Required" : true,
    },
    {
      title: "Fee",
      field: "fee",
      validate: (rowData) =>
        rowData.fee === undefined || rowData.fee === "" ? "Required" : true,
    },
  ];
  return (
    <>
      
      <TableCell>{showNameCount(data)}</TableCell>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {/*<Grid items={divs}/>*/}
          {divs.length > 0
            ? Array.from(divs).map((data, index) => (
                <>
                  <Card key={index} name={data} />
                </>
              ))
            : null}
        </Grid>

        <Grid item xs={8}>
          <div >
            <MaterialTable
          
              title={
                <div style={{TextAlign:"center",fontSize:"30px",color:"rgb(60, 60, 212)"}}>
                  My Personal Applications
                </div>
              }
              columns={columns}
              data={data}
              component={Paper}
              options={{
                sorting: true,
                search: true,
                searchFieldAlignment: "right",
                searchAutoFocus: true,
                searchFieldVariant: "standard",
                filtering: true,
                paging: true,
                pageSizeOptions: [2, 5, 7, 10, 25, 50, 100],
                pageSize: 7,
                paginationType: "stepped",
                showFirstLastPageButtons: false,
                exportButton: true,
                exportAllData: true,
                exportFileName: "TableData",
                addRowPosition: "first",
                actionsColumnIndex: -1,
                selection: true,
                showSelectAllCheckbox: false,
                showTextRowsSelected: true,
                
                grouping: false,
                columnsButton: true,
                rowStyle: (data, index) =>
                index % 2 === 0 ? { background: "#f5f5f5" } : null,
              headerStyle: {
                background:
                "#f5f5f5",
               fontSize:"17px",
                color: "black",
              },
              }}

              style={{marginLeft:"60px",marginRight:"30px", border:"solid 3px rgb(235, 233, 233)"}}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default TablePage;

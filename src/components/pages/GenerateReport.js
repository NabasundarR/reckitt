import React, {  useState } from "react";
import NavHeader from '../layout/NavHeader'
import SideMenu from '../layout/Sidemenu'
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import axios from 'axios';
import Getusers from "../auth/Getusers";
import Preview from "./Preview";
import  Spinner  from "../layout/Spinner";


const GenerateReport = () => {
    const [validated, setValidated] = useState(false);
    const [invoicename, setInvoicename] = useState("");
    const [Templatetype, setTemplate] = useState("");
    const [isLoading, setIsloading] = useState(false);
    const [issuccess, setsuccess] = useState(false);
    const [iserror, seterror] = useState(false);
    const [fileError, setfileError] = useState(false);
    
    const [srcData, setsrcData] = useState("");

    const [xlsxfile ,setxlsxfile] = useState("");
    const [Pdffile ,setpdfFile] = useState("");

    const [xlsxfileValues ,setxlsxfileValues] = useState("");
    const [PDFfileValues ,setPDFfileValues] = useState("");

    const [fileSize ,setfileSize] = useState(0);

    const [xlsxfileFormart ,setxlsxfileFormart] = useState("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    const [PdffileFormart ,setPdffileFormart] = useState("application/pdf");
    const [modalShow, setModalShow] = React.useState(false);

    {/*const passtoken = JSON.parse(localStorage.getItem("okta-token-storage"))[
      "accessToken"
    ]["accessToken"];*/}
  
    //const baseUrl = "/customdoc/generate";
  

    const handleSubmit = (event) =>{

      event.preventDefault();
      setValidated(true);
      const form = event.currentTarget;
     // console.log(form);

      let formData = new FormData();

      formData.append('Invoicename', 1);
      formData.append('Templatename', Templatetype);
      formData.append('xlsFile', xlsxfile);
      formData.append('pdfFile', Pdffile);

      //console.log(invoicename,Templatetype,xlsxfile,Pdffile)

      const APIKey =  '725e37d2-97a8-11ed-a8fc-0242ac120002'

      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        
        //console.log("form validate");
        setIsloading(true);

        axios({
          method: "post",
          url: "https://aipv2.azurewebsites.net/aipd/customdoc/generate",
          data: formData,
          responseType: 'blob', // important
          headers: { 
            "x-api-key": APIKey,
            'content-type': 'multipart/form-data' 
          }
        
        })
      
        .then (res => {
           // console.log(res);
            if(res.status === 200){
              setInvoicename("")
              setTemplate("")
              setxlsxfile("")
              setxlsxfile("")
              setxlsxfileValues("")
              setPDFfileValues("")
              setfileSize(0)
              setsuccess(true);
              setTimeout(() => {
                setsuccess(false);
              }, 10000);
              seterror(false);
              setValidated(false)
              setIsloading(false)

              const url = window.URL.createObjectURL(res.data)
              setsrcData(url)
             // const link = document.createElement('a');
    
              //link.href = url;
    
             // link.setAttribute('download', 'file.pdf');

    
              //document.body.appendChild(link);
              //console.log("document.body.appendChild(link)")
              //console.log(document.body.appendChild(link))
              setModalShow(true)
             // link.click();
        
            }
  
            else if(res.status !== 200){
              setxlsxfile("")
              setxlsxfile("")
              setxlsxfileValues("")
              setPDFfileValues("")
              seterror(true);
              setIsloading(false)
              setTimeout(() => {
                seterror(false);
              }, 10000);
            }
          
        })

       
  
        .catch(function (error) {
          console.log(error);
          setxlsxfile("")
          setxlsxfile("")
          setxlsxfileValues("")
          setPDFfileValues("")
          setIsloading(false);
          setValidated(false);
          setsuccess(false);
          seterror(true);
          setTimeout(() => {
            seterror(false);
          }, 10000);
        });

       
      }

     



    
    

    }


console.log(srcData)
console.log(srcData.length)

  /*  const handleSubmit = (event) => {
        event.preventDefault();
        setValidated(true);
        const form = event.currentTarget;
        console.log(form);
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
         
          setValidated(true);
          setIsloading(true);
          fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              invoiceName: invoicename,
              TemplateName: Templatetype,
            }),
          })
            .then(function (response) {
              if (response.status === 200) {
                console.log(response);
                setIsloading(false);
                setValidated(false);
                setInvoicename("");
                setTemplate("");
                setsuccess(true);
                setTimeout(() => {
                  setsuccess(false);
                }, 10000);
                seterror(false);

              }
            })
            .catch(function (error) {
              console.log(error);
              setIsloading(false);
              setValidated(false);
              setsuccess(false);
              seterror(true);
              setTimeout(() => {
                seterror(false);
              }, 10000);
                  
            });
        }
      };
      */

      const resetForm = (e) => {
        e.preventDefault();
        setInvoicename("");
        setTemplate("");
        setValidated(false);
        setPDFfileValues("")
        setpdfFile("")
        setxlsxfileValues("")
        setxlsxfile("")
        setfileError(false)
      
      };

      const handleFileUploadXlsx = (event) => {
        event.preventDefault();
        console.log("xlsx file uploading ....")
        var filesize = ((event.currentTarget.files[0].size/1024)/1024).toFixed(4); // MB
        console.log(filesize)
        setxlsxfile(event.currentTarget.files[0]); 
        setfileSize(filesize)

        if(filesize >2){
          setfileError(true)
          setValidated(false)
          setxlsxfile("")
          console.log("File size is grater then 2mb")
          setxlsxfileValues("")

        }
        else{
          setfileError(false)
          setxlsxfileFormart(event.currentTarget.files[0].type)
          console.log("File size less then 2mb")

        }

       
    
      }
      //console.log("xlsxfile")
      //console.log(xlsxfile)


      const handleFileUploadPDF = (event) => {
        event.preventDefault();
        console.log("PDF file uploading ....")
        var filesize = ((event.currentTarget.files[0].size/1024)/1024).toFixed(4); // MB
        console.log(filesize)
        setpdfFile(event.currentTarget.files[0]); 
       // console.log(Pdffile)
        setfileSize(filesize)

        if(filesize >2){
          setfileError(true)
          setValidated(false)
          setpdfFile("")
          console.log("File size is grater then 2mb")
          setPDFfileValues("")

        }
        else{
          setfileError(false)
          setPdffileFormart(event.currentTarget.files[0].type)
          console.log("File size less then 2mb")

        }
    
      }

      
  
  return (
    <div>
      <NavHeader />
      <SideMenu />
      <div id="main">
        {isLoading &&  <div
            style={{
              position: "relative",
              display: "grid",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              alignContent: "center",
            }}
          >
            <span style={{ display: "grid", justifyContent: "center" }}>
              <Spinner />
            </span>
            <span
              style={{
                color: "#ff007f",
                fontSize: "18px",
                fontWeight: "600",
                textAlign: "center",
                paddingTop:"1rem"
              }}
            >
              {" "}
              Please Wait sometime
            </span>
          </div>}

        {fileError && (
          <div>
            <div class="alert alert-danger" role="alert">
              FileSize is grater then 2MB, current file size is {fileSize}
            </div>
          </div>
        )}

        {!isLoading && (
          <div>
            <Getusers />
            <span
              style={{ paddingTop: "2rem",paddingBottom:"0px" }}
              className="headerTextFontcolorNew"
            >
              Generate Report
            </span>

            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <Row className="mb-3">
               {/* <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label className="formLableText">
                    Invoice Name *
                  </Form.Label>

                  <Form.Select
                    required
                    value={invoicename}
                    onChange={(e) => setInvoicename(e.target.value)}
                  >
                    <option value="">Select Invoice</option>
                    <option value="1">Invoice 1</option>
                    <option value="2">Invoice 2</option>
                    <option value="3">Invoice 3</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Invoice is required *
                  </Form.Control.Feedback>
        </Form.Group>*/}

               
              </Row>

              <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label className="formLableText">
                    Template Name *
                  </Form.Label>

                  <Form.Select
                    required
                    value={Templatetype}
                    onChange={(e) => setTemplate(e.target.value)}
                  >
                    <option value="">Select Template</option>
                    <option value="1">Caricom- Trinadad</option>
                    <option value="2">Al Naghi- Saudi Arabia</option>
                    <option value="3">Centradix - Casablanca</option>
                    <option value="4">SDL - Netherlands</option>
                    <option value="5">WSCG - Netherlands</option>
                    <option value="6">Bhavna -Singapore</option>
                    <option value="7">Birc - Philippines</option>
                    <option value="8">Superstar - Johar</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Template is required *
                  </Form.Control.Feedback>
                </Form.Group>
             
                <Form.Group
                  as={Col}
                  md="4"
                  controlId="validationCustom03"
                  className="mb-3"
                >
                  <Form.Label className="formLableText">
                    File Upload (Packaging List){" "}
                  </Form.Label>

                  <Form.Control
                    type="file"
                    autoComplete="off"
                    isInvalid={
                      xlsxfileFormart ===
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                      xlsxfileFormart === "application/vnd.ms-excel"
                        ? false
                        : true
                    }
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    value={xlsxfileValues}
                    onChange={(e) => {
                      setxlsxfileValues(e.target.value);
                      handleFileUploadXlsx(e);
                    }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    XlSX File is required *
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  as={Col}
                  md="4"
                  controlId="validationCustom04"
                  className="mb-3"
                >
                  <Form.Label className="formLableText">
                    File Upload (SAP Invoice){" "}
                  </Form.Label>

                  <Form.Control
                    type="file"
                    autoComplete="off"
                    isInvalid={
                      PdffileFormart === "application/pdf" ? false : true
                    }
                    accept="application/pdf"
                    value={PDFfileValues}
                    onChange={(e) => {
                      setPDFfileValues(e.target.value);
                      handleFileUploadPDF(e);
                    }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    PDF File is required *
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <div
                style={{ gridGap: "10px", display: "flex", marginTop: "3rem" }}
                className="mb-3"
              >
                <Button className="submit_btn" type="submit">
                  Generate PDF
                </Button>
                <Button onClick={resetForm} className="submit_btn" type="reset">
                  {" "}
                  Reset
                </Button>
              </div>
            </Form>

           
           

            <Preview srcdata={srcData} show={modalShow} onHide={() => setModalShow(false)} />
          </div>
        )}

        {issuccess && (
          <div>
            <Alert
              style={{ position: "absolute", right: "20px", top: "90px" }}
              variant="success"
            >
              <p className="mb-0">Successfully Generate a PDF</p>
            </Alert>
          </div>
        )}

        {iserror && (
          <div>
            <Alert
              style={{ position: "absolute", right: "20px", top: "90px" }}
              variant="danger"
            >
              <p className="mb-0">
                something went wrong!! Please try after sometime{" "}
              </p>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
}

export default GenerateReport

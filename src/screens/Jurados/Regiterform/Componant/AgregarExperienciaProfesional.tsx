import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Form,
  Header,
  Input,
  Button,
  Grid,
  Segment,
  Divider,
  Table,
  Menu,
  Icon,
  TextArea,
  Pagination,
} from "semantic-ui-react";
import ViewModel from "../../../Popupmodel/ViewEducationjurados";
import EditarExperienciaProfesionalModel from "../../../Popupmodel/EditarExperienciaProfesionalModel";
import DeleteEducationjurados from "../../../Popupmodel/DeleteEducationjurados";
import DatePicker from "react-date-picker";
import moment from "moment";
import ApiEndPoint from "../../../../utils/apiEndPoints";
import {
  apiCall,
  successToast,
  errorToast,
} from "../../../../utils/httpClient";
import Loader from "../../../../components/loader";
import Sidebar from "../../../../components/NavBar";
import HeaderMenu from "../../../../components/Header";

export default function AgregarExperienciaProfesional(props:any) {
  const { isEdit } = props;

  const [activeIndex, setActiveIndex] = useState<any>(null);
  const [viewEduOpen, setViewEduOpen] = useState<any>(false);
  const [editEduOpen, setEditEduOpen] = useState<any>(false);
  const [deleteEduOpen, setDeleteEduOpen] = useState<any>(false);
  const [resumeData, setResumeData] = useState<any>(false);
  const [selectStartDate, setSelectStartDate] = useState<any>(new Date());
  const [selectEndDate, setSelectEndDate] = useState<any>(new Date());
  const [identityDocument, setIdentityDocument] = useState<any>(null);
  const [formErrors, setFormErrors] = useState<any>(null);
  const [formListData, setFormListData] = useState<any>([]);
  const [baseUrl, setBaseUrl] = useState<any>("");
  const [editData, setEditData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<any>(false);
  const [limit, setLimit] = useState<any>(10);
  const [offset, setOffset] = useState<any>(0);
  const [totalPages, setTotalPages] = useState<any>(1);
  const [activePage, setActivePage] = useState<any>(1);
  const [boundaryRange, setboundaryRange] = useState<any>(1);
  const [siblingRange, setsiblingRange] = useState<any>(1);
  const [showEllipsis, setshowEllipsis] = useState<any>(true);
  const [showFirstAndLastNav, setshowFirstAndLastNav] = useState<any>(true);
  const [showPreviousAndNextNav, setshowPreviousAndNextNav] = useState<any>(true);
  const [formData, setFormData] = useState<any>({
    resume_id: resumeData.resume_id,
    project_name: "",
    position: "",
    principal_functions: "",
    start_date: new Date(),
    finish_date: new Date(),
  });

  useEffect(() => {
    setResumeDetail();
    getProfessionalExperienceData(offset);
  }, []);

  async function setResumeDetail() {
    const resData:any = await localStorage.getItem("resumeData");
    const val = JSON.parse(resData);
    await setResumeData(val);
  }

  function formValidation() {
    let formErrors :any = {};
    let formIsValid = true;

    if (!formData.project_name) {
      formIsValid = false;
      formErrors["project_name"] = true;
    }
    if (!formData.position) {
      formIsValid = false;
      formErrors["position"] = true;
    }
    if (!formData.principal_functions) {
      formIsValid = false;
      formErrors["principal_functions"] = true;
    }
    if (!selectStartDate) {
      formIsValid = false;
      formErrors["start_date"] = true;
    }
    if (!selectEndDate) {
      formIsValid = false;
      formErrors["end_date"] = true;
    }
    // if (!identityDocument) {
    //   formIsValid = false;
    //   formErrors["identityDocument"] = "Document is required !";
    // }
    setFormErrors(formErrors);
    return formIsValid;
  }

  async function formSubmitData() {
    if (formValidation()) {
      setIsLoading(true);

      let formdataSave = new FormData();
      formdataSave.append("resume_id", resumeData.resume_id);
      formdataSave.append("project_name", formData.project_name);
      formdataSave.append("position", formData.position);
      formdataSave.append("principal_functions", formData.principal_functions);
      formdataSave.append(
        "start_date",
        moment(selectStartDate).format("DD-MM-YYYY")
      );
      formdataSave.append(
        "finish_date",
        moment(selectEndDate).format("DD-MM-YYYY")
      );
      formdataSave.append("document", identityDocument);
      const header = { "Content-Type": "multipart/form-data" };

      const { data } = await apiCall(
        "POST",
        ApiEndPoint.ADDPROFESSIONALEXPERIENCE,
        formdataSave,
        header
      );
      if (data.status == 200) {
        setIsLoading(false);
        successToast(data.message);
        cleanField();
        getProfessionalExperienceData(offset);
      } else {
        setIsLoading(false);
        errorToast(data.message);
      }
    }
  }
  async function getProfessionalExperienceData(ofst:any) {
    const resData:any = await localStorage.getItem("resumeData");
    const val = JSON.parse(resData);
    const params = {
      resume_id: val ? val.resume_id : 0,
      offset: ofst,
      limit: 10,
    };
    const { data } = await apiCall(
      "POST",
      ApiEndPoint.GETPROFESSIONALEXPERIENCELIST,
      params
    );
    setIsLoading(true);
    if (data.status == 200) {
      setFormListData(data.data);
      setIsLoading(false);
      setBaseUrl(data.base_url);
    } else {
      setIsLoading(false);
      setFormListData([]);
      errorToast(data.message);
    }
  }
  const deleteEdu = async () => {
    const params = {
      resume_id: resumeData.resume_id.toString(),
      professional_experience_id: editData.professional_experience_id,
    };
    setIsLoading(true);
    const { data } = await apiCall(
      "POST",
      ApiEndPoint.DELETEPROFESSIONALEXPERIENCEDATA,
      params
    );
    if (data.status == 200) {
      setIsLoading(false);
      setDeleteEduOpen(false);
      getProfessionalExperienceData(offset);
      setEditData({});
      successToast(data.message);
    } else {
      setIsLoading(false);
      setDeleteEduOpen(false);
      setEditData({});
      errorToast(data.message);
    }
  };

  async function handelClickPhotoImg() {
    // photoClickBtn.current?.click()
     // @ts-ignore
    document.getElementById("photoSelect").click();
  }
  const onFilechange = (event:any) => {
    setIdentityDocument(event.target.files[0]);
  };

  function cleanField() {
    setFormData({
      project_name: "",
      position: "",
      principal_functions: "",
      start_date: new Date(),
      finish_date: new Date(),
    });
    setSelectStartDate(new Date());
    setSelectEndDate(new Date());
    setIdentityDocument({});
    return true;
  }
  const handlePaginationChange = (e:any, { activePage }:any) => {
    setActivePage(activePage);

    const offst = limit * activePage;
    setOffset(offst);
    getProfessionalExperienceData(offst);
  };
  return (
    <div>
      {isLoading && <Loader />}
      <Container fluid>
        <ViewModel
          viewEduOpen={viewEduOpen}
          setViewEduOpen={setViewEduOpen}
          editData={editData}
          baseUrl={baseUrl}
          image={baseUrl + editData?.certification}
        />
        <EditarExperienciaProfesionalModel
          editEduOpen={editEduOpen}
          setEditEduOpen={setEditEduOpen}
          editData={editData}
          masterData={props.masterData}
          setEditData={setEditData}
          getProfessionalExperienceData={getProfessionalExperienceData}
          setIsLoading={setIsLoading}
        />
        <DeleteEducationjurados
          deleteEduOpen={deleteEduOpen}
          setDeleteEduOpen={setDeleteEduOpen}
          deleteEdu={deleteEdu}
        />

        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column className="form--left-box">
              <Sidebar />
            </Grid.Column>
            <Grid.Column className="form--right-box">
              <HeaderMenu />
              <Grid style={{ width: "100%", margin: 0 }}>
                <Grid.Column style={{ maxWidth: "99%" }}>
                  <Form size="large">
                    <Segment>
                      <Header
                        as="h4"
                        className="jura--form-heading"
                        floated="left"
                      >
                        Experiencia Profesional -{" "}
                        <small>Todos los campos son obligatorios</small>
                      </Header>
                      <Divider clearing />

                      <Grid columns={4}>
                        <Grid.Row>
                          <Grid.Column>
                            <label>Nombre entidad / Proyecto</label>
                            <Form.Input
                              labelPosition="right"
                              placeholder=""
                              // style={{width:60}}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  project_name: e.target.value,
                                })
                              }
                              value={formData?.project_name}
                              error={
                                !formData.project_name &&
                                formErrors?.project_name
                              }
                            />
                          </Grid.Column>

                          <Grid.Column>
                            <label>Fecha de inicio</label>
                            <DatePicker
                              /* onChange={(e)=>setSelectDate(e.target.value)} */
                              onChange={setSelectStartDate}
                              value={selectStartDate}
                              className="date_pkr"
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <label>Fecha de terminación</label>
                            <DatePicker
                              onChange={setSelectEndDate}
                              value={selectEndDate}
                              className="date_pkr"
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <label>Cargo / Rol desempeñado</label>
                            <Form.Input
                              fluid
                              placeholder=""
                              name="numero_documento"
                              type="text"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  position: e.target.value,
                                })
                              }
                              value={formData?.position}
                              error={!formData.position && formErrors?.position}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>

                      <Grid columns={1}>
                        <Grid.Row>
                          <Grid.Column>
                            <Form className="form--dec-input">
                              <label>Funciones principales</label>
                              <Form.TextArea
                                placeholder=""
                                rows={4}
                                rowsMax={4}
                                value={formData?.principal_functions}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    principal_functions: e.target.value,
                                  })
                                }
                                required={true}
                                error={
                                  !formData.principal_functions &&
                                  formErrors?.principal_functions
                                }
                              />
                            </Form>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>

                      <Grid columns={1}>
                        <Grid.Row>
                          <Grid.Column>
                            <Form className="form--dec-input">
                              <Input
                                type="file"
                                id="photoSelect"
                                onChange={(e) => onFilechange(e)}
                                style={{ display: "none" }}
                              />
                              <label>
                                Adjuntar foto - <small>Opcional</small>
                              </label>
                              <div
                                onClick={() => handelClickPhotoImg()}
                                className="curser-pointer"
                              >
                                <Input
                                  label={{ basic: true, content: "Adjuntar" }}
                                  labelPosition="right"
                                  placeholder=""
                                  value={
                                    identityDocument?.name
                                      ? identityDocument?.name
                                      : ""
                                  }
                                  className="usr--img-input curser-pointer"
                                  style={{ width: "91%" }}
                                />
                              </div>
                            </Form>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>

                      <Grid columns={1}>
                        <Grid.Row>
                          <Grid.Column>
                            <Grid className="form--buton-box form--education mt-1">
                              <span
                                onClick={cleanField}
                                className="link-font-text curser-pointer"
                              >
                                Limpiar campos
                              </span>
                              <Button
                                content="Agregar"
                                onClick={() => formSubmitData()}
                                className="btn btn-primary"
                              />
                            </Grid>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Segment>
                  </Form>
                </Grid.Column>
              </Grid>

              <Grid style={{ width: "100%", margin: "0px 0rem" }}>
                <Grid.Column style={{ maxWidth: "99%" }}>
                  <Form size="large">
                    <Segment>
                      <Header
                        as="h4"
                        className="jura--form-heading"
                        floated="left"
                      >
                        Mis Experiencias Proefecionales
                      </Header>
                      <Divider clearing />

                      <Grid columns={1}>
                        <div className="form--tblrow">
                          <Table celled className="main-data-table">
                            <Table.Header>
                              <Table.Row className="table--head">
                                <Table.HeaderCell className="headcol">
                                  <div className="display-flex">
                                    <span>No.</span>
                                    <span>Nombre entidad</span>
                                  </div>
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Fecha inicio
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Fecha Terminación
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Cargo / Rol Desempeñado
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Anexo
                                </Table.HeaderCell>
                                <Table.HeaderCell className="headcol2">
                                  Acciones
                                </Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>

                            <Table.Body>
                              {formListData &&
                                formListData.map((item:any, i:any) => {
                                  i++;
                                  return (
                                    <Table.Row key={i}>
                                      <Table.Cell className="headcol">
                                        <div className="display-flex">
                                          <span>{i}</span>
                                          <span>{item.project_name}</span>
                                        </div>
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.start_date}
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.finish_date}
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.position}
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.principal_functions}
                                      </Table.Cell>
                                      <Table.Cell className="headcol2">
                                        <Icon
                                          onClick={() => (
                                            setViewEduOpen(true),
                                            setEditData(item)
                                          )}
                                          name="eye"
                                        />
                                        <Icon
                                          onClick={() => (
                                            setEditEduOpen(true),
                                            setEditData(item)
                                          )}
                                          name="pencil alternate"
                                        />
                                        <Icon
                                          onClick={() => (
                                            setDeleteEduOpen(true),
                                            setEditData(item)
                                          )}
                                          name="trash"
                                          style={{ color: "red" }}
                                        />
                                      </Table.Cell>
                                    </Table.Row>
                                  );
                                })}
                            </Table.Body>
                          </Table>
                        </div>
                        <Container
                          className="pagination-box"
                          style={{ width: "100%", margin: 26 }}
                        >
                          <Grid>
                            <Grid.Column floated="right" width={5}>
                              <Menu floated="right" pagination>
                                <Pagination
                                  activePage={activePage}
                                  boundaryRange={boundaryRange}
                                  onPageChange={handlePaginationChange}
                                  size="mini"
                                  siblingRange={siblingRange}
                                  totalPages={totalPages}
                                  ellipsisItem={{
                                    content: (
                                      <Icon name="ellipsis horizontal" />
                                    ),
                                    icon: true,
                                  }}
                                  firstItem={{
                                    content: <Icon name="angle double left" />,
                                    icon: true,
                                  }}
                                  lastItem={{
                                    content: <Icon name="angle double right" />,
                                    icon: true,
                                  }}
                                  prevItem={{
                                    content: <Icon name="angle left" />,
                                    icon: true,
                                  }}
                                  nextItem={{
                                    content: <Icon name="angle right" />,
                                    icon: true,
                                  }}
                                />
                              </Menu>
                            </Grid.Column>
                          </Grid>
                        </Container>
                      </Grid>

                      <Divider clearing />
                      <Grid columns={2} divided>
                        <Grid.Row>
                          <Grid.Column>
                            <Button
                              content="Atrás"
                              className="btn btn-primary"
                              onClick={() => props.goBack(4)}
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <Grid className="form--buton-box mt-1">
                              <Button
                                onClick={() =>
                                  isEdit
                                    ? props.onPressEdit(10, false)
                                    : formListData.length > 0
                                    ? props.setShowPage(6)
                                    : errorToast("Please fill details")
                                }
                                content="Guardar y Continuar"
                                className="btn btn-primary right floated"
                              />
                            </Grid>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Segment>
                  </Form>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

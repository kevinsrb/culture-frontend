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
  Radio,
  Table,
  Label,
  Menu,
  Icon,
  Modal,
  Image,
  TextArea,
  Pagination,
} from "semantic-ui-react";
import loginimage from "../../../../assets/login.png";
import ViewModel from "../../../Popupmodel/ViewEducationjurados";
import EditAgregarReconocimeintosModel from "../../../Popupmodel/EditAgregarReconocimeintosModel";
import DeleteEducationjurados from "../../../Popupmodel/DeleteEducationjurados";
import ApiEndPoint from "../../../../utils/apiEndPoints";
import {
  apiCall,
  successToast,
  errorToast,
} from "../../../../utils/httpClient";
import Loader from "../../../../components/loader";
import Sidebar from "../../../../components/NavBar";
import HeaderMenu from "../../../../components/Header";

export default function AgregarReconocimeintos(props:any) {
  const { citiesData, isEdit } = props;
  const [viewEduOpen, setViewEduOpen] = useState<any>(false);
  const [editEduOpen, setEditEduOpen] = useState<any>(false);
  const [deleteEduOpen, setDeleteEduOpen] = useState<any>(false);
  const [openDropdown, setOpenDropdown] = useState<any>("");
  const [placeTown, setPlaceTown] = useState<any>("");
  const [formErrors, setFormErrors] = useState<any>({});
  const [identityDocument, setIdentityDocument] = useState<any>(null);
  const [resumeData, setResumeData] = useState<any>({});
  const [baseUrl, setBaseUrl] = useState<any>("");
  const [formListData, setFormListData] = useState<any>([]);
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
    resume_id: 0,
    name: "",
    institution_grants: "",
    town: 0,
    year: "",
  });

  useEffect(() => {
    setResumeDetail();
    getAcknowledgmentsData(offset);
  }, []);

  async function setResumeDetail() {
    const resData:any = await localStorage.getItem("resumeData");
    const val = JSON.parse(resData);
    await setResumeData(val);
  }

  async function handelDropdown(type:any) {
    const valDro = openDropdown == type ? "" : openDropdown != type ? type : "";
    setOpenDropdown(valDro);
  }
  async function handleSelectChange(type:any, item:any) {
    if (type == "town") {
      setFormData({
        ...formData,
        town: item.city_id,
      });
    }
    setOpenDropdown("");
  }
  async function handelClickPhotoImg() {
    // photoClickBtn.current?.click()
    //@ts-ignore
    document.getElementById("photoSelect").click();
  }
  const onFilechange = (event:any) => {
    console.log("event: ", event);
    setIdentityDocument(event.target.files[0]);
  };
  function formValidation() {
    let formErrors:any = {};
    let formIsValid = true;

    if (!formData.name) {
      formIsValid = false;
      formErrors["name"] = true;
    }
    if (!formData.institution_grants) {
      formIsValid = false;
      formErrors["institution_grants"] = true;
    }
    if (!formData.year) {
      formIsValid = false;
      formErrors["year"] = true;
    }
    if (!formData.town) {
      formIsValid = false;
      formErrors["town"] = true;
    }
    if (!identityDocument?.name) {
      formIsValid = false;
      formErrors["document"] = true;
    }

    setFormErrors(formErrors);
    return formIsValid;
  }
  async function formSubmitData() {
    if (formValidation()) {
      setIsLoading(true);
      let formdataSave = new FormData();
      formdataSave.append("resume_id", resumeData.resume_id);
      formdataSave.append("name", formData.name);
      formdataSave.append("institution_grants", formData.institution_grants);
      formdataSave.append("town", formData.town);
      formdataSave.append("year", formData.year);
      formdataSave.append("document", identityDocument);
      const header = { "Content-Type": "multipart/form-data" };

      const { data } = await apiCall(
        "POST",
        ApiEndPoint.ADDACKNOWLEDGMENT,
        formdataSave,
        header
      );
      if (data.status == 200) {
        setIsLoading(false);
        getAcknowledgmentsData(offset);
        successToast(data.message);
        clearField();
      } else {
        setIsLoading(false);
        errorToast(data.message);
      }
    }
  }
  async function getAcknowledgmentsData(offsetval:any) {
    const resData:any = await localStorage.getItem("resumeData");
    const val = JSON.parse(resData);
    setIsLoading(true);
    const params = {
      resume_id: val ? val.resume_id : 0,
      offset: offsetval,
      limit: 10,
    };
    const { data } = await apiCall(
      "POST",
      ApiEndPoint.GETACKNOWLEDGMENTLIST,
      params
    );
    if (data.status == 200) {
      setIsLoading(false);

      setFormListData(data.data);
      setBaseUrl(data.base_url);
    } else {
      setFormListData([]);
      errorToast(data.message);
      setIsLoading(false);
    }
  }
  const deleteEdu = async () => {
    const params = {
      resume_id: resumeData.resume_id.toString(),
      knowledgment_id: editData.knowledgment_id,
    };
    setIsLoading(true);

    const { data } = await apiCall(
      "POST",
      ApiEndPoint.DELETEACKNOWLEDGMENTSDATA,
      params
    );
    if (data.status == 200) {
      setDeleteEduOpen(false);
      setIsLoading(false);
      getAcknowledgmentsData(offset);
      successToast(data.message);
      setEditData({});
    } else {
      setDeleteEduOpen(false);
      setIsLoading(false);
      errorToast(data.message);
      setEditData({});
    }
  };
  function clearField() {
    setFormData({
      name: "",
      institution_grants: "",
      town: 0,
      year: "",
    });
    setPlaceTown("");
    setIdentityDocument({});
  }
  const handlePaginationChange = (e:any, { activePage }:any) => {
    setActivePage(activePage);

    const offst = limit * activePage;
    setOffset(offst);
    getAcknowledgmentsData(offst);
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
          image={baseUrl + editData.document}
        />
        <EditAgregarReconocimeintosModel
          editEduOpen={editEduOpen}
          setEditEduOpen={setEditEduOpen}
          editData={editData}
          masterData={props.masterData}
          setEditData={setEditData}
          getAcknowledgmentsData={getAcknowledgmentsData}
          citiesData={citiesData}
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
                        Reconocimientos -{" "}
                        <small>Todos los campos son obligatorios</small>
                      </Header>
                      <Divider clearing />

                      <Grid columns={4}>
                        <Grid.Row>
                          <Grid.Column>
                            <label>Nombre</label>
                            <Form.Input
                              fluid
                              placeholder=""
                              name=""
                              type="text"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                })
                              }
                              value={formData?.name}
                              error={!formData.name && formErrors?.name}
                            />
                          </Grid.Column>

                          <Grid.Column>
                            <label>Institución que la Otorga</label>
                            <Form.Input
                              fluid
                              placeholder=""
                              name=""
                              type="text"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  institution_grants: e.target.value,
                                })
                              }
                              value={formData?.institution_grants}
                              error={
                                !formData.institution_grants &&
                                formErrors?.institution_grants
                              }
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <label>Año</label>
                            <Form.Input
                              fluid
                              placeholder=""
                              name=""
                              type="number"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  year: e.target.value,
                                })
                              }
                              value={formData?.year}
                              error={!formData.year && formErrors?.year}
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <label>Ciudad</label>
                            <Form.Field>
                              {// @ts-ignore
                                <Form.Select
                                placeholder={placeTown}
                                onClick={() => handelDropdown("town")}
                                className="select--val"
                                error={!formData.town && formErrors?.town}
                                />
                              }
                              {openDropdown && openDropdown == "town" ? (
                                <Grid columns={1} className="select__box">
                                  <Grid.Row>
                                    <Grid.Column className="select__box_clm">
                                      <Grid>
                                        {citiesData &&
                                          citiesData.length &&
                                          citiesData.map((item:any, i:any) => {
                                            return (
                                              <p
                                                key={i}
                                                onClick={() => (
                                                  handleSelectChange(
                                                    "town",
                                                    item
                                                  ),
                                                  setPlaceTown(item.city_name)
                                                )}
                                                className="form-slct"
                                              >
                                                <p className="form-slct_text">
                                                  {item.city_name}{" "}
                                                </p>
                                              </p>
                                            );
                                          })}
                                      </Grid>
                                    </Grid.Column>
                                  </Grid.Row>
                                </Grid>
                              ) : (
                                ""
                              )}
                            </Form.Field>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>

                      <Grid columns={1}>
                        <Grid.Row>
                          <Grid.Column>
                            {/* <Form className="form--dec-input"> */}
                            <label>Anexar documento</label>
                            <Form className="form--dec-input">
                              <Input
                                type="file"
                                id="photoSelect"
                                onChange={(e) => onFilechange(e)}
                                style={{ display: "none" }}
                              />
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
                                  style={{ width: "91%" }}
                                  className={`usr--img-input curser-pointer
                                       ${
                                         !identityDocument &&
                                         formErrors?.document &&
                                         "activeBorder"
                                       }`}
                                />
                              </div>
                            </Form>
                            {/* </Form> */}
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>

                      <Grid columns={1}>
                        <Grid.Row>
                          <Grid.Column>
                            <Grid className="form--buton-box form--education mt-1">
                              <span
                                onClick={clearField}
                                className="link-font-text curser-pointer"
                              >
                                Limpiar campos
                              </span>
                              <Button
                                onClick={() => formSubmitData()}
                                content="Agregar"
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
                        Mis Reconocimientos
                      </Header>
                      <Divider clearing />

                      <Grid columns={1}>
                        <div className="form--tblrow">
                          <Table celled className="main-data-table">
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell className="headcol">
                                  <div className="display-flex">
                                    <span>No.</span>
                                    <span>Nombre reconocimiento</span>
                                  </div>
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Institución que la otorga
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Año
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Ciudad
                                </Table.HeaderCell>
                                <Table.HeaderCell className="headcol2">
                                  Acciones
                                </Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>

                            <Table.Body>
                              {formListData &&
                                // formListData.length &&
                                formListData.map((item:any, i:any) => {
                                  i++;
                                  return (
                                    <Table.Row key={i}>
                                      <Table.Cell className="headcol">
                                        <div className="display-flex">
                                          <span>{i}</span>
                                          <span>{item.name}</span>
                                        </div>
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.institution_grants}
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.year}
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.town_name}
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
                              onClick={() => props.goBack(6)}
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <Grid className="form--buton-box mt-1">
                              <Button
                                onClick={() =>
                                  isEdit
                                    ? props.onPressEdit(10, false)
                                    : formListData.length > 0
                                    ? props.setShowPage(8)
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

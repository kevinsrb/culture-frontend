import React, { useState, useEffect } from "react";
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
  Pagination,
} from "semantic-ui-react";
import ApiEndPoint from "../../../../utils/apiEndPoints";
import {
  apiCall,
  successToast,
  errorToast,
} from "../../../../utils/httpClient";
import ViewModel from "../../../Popupmodel/ViewEducationjurados";
import EditAgregarPublicacionesModel from "../../../Popupmodel/EditAgregarPublicacionesModel";
import DeleteEducationjurados from "../../../Popupmodel/DeleteEducationjurados";
import Loader from "../../../../components/loader";
import Sidebar from "../../../../components/NavBar";
import HeaderMenu from "../../../../components/Header";

export default function AgregarPublicaciones(props: any) {
  const { isEdit } = props;
  const [activeIndex, setActiveIndex] = useState<any>(null);
  const [viewEduOpen, setViewEduOpen] = React.useState<any>(false);
  const [editEduOpen, setEditEduOpen] = React.useState<any>(false);
  const [deleteEduOpen, setDeleteEduOpen] = React.useState<any>(false);
  const [resumeData, setResumeData] = useState<any>({});
  const [selectPhoto, setSelectPhoto] = useState<any>(null);
  const [openDropdown, setOpenDropdown] = useState<any>("");
  const [formErrors, setFormErrors] = useState<any>();
  const [listArray, setListArray] = useState<any>([]);
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
  const [sidebarShow, setSidebarShow] = useState<any>(false);
  const [formData, setFormData] = useState<any>({
    resume_id: "",
    title: "",
    theme: "",
    guy: "",
    format: "",
    town: "",
    year: "",
  });
  const [guy, setGuy] = useState<any>("");
  const [town, setTown] = useState<any>("");
  const [format, setFormat] = useState<any>("");

  useEffect(() => {
    setResumeDetail();
    getPublicationList(offset);
  }, []);

  async function setResumeDetail() {
    const resData: any = await localStorage.getItem("resumeData");
    const val = JSON.parse(resData);
    await setResumeData(val);
  }
  const masterFilter = (type: any) =>
    (props.masterData &&
      props.masterData.filter((item: any) => item.type == type)) ||
    [];
  async function handelDropdown(type: any) {
    const valDro = openDropdown == type ? "" : openDropdown != type ? type : "";
    setOpenDropdown(valDro);
  }
  async function handleSelectChange(type: any, item: any) {
    if (type == "guy") {
      setFormData({
        ...formData,
        guy: item.id,
      });
    }
    if (type == "format") {
      setFormData({
        ...formData,
        format: item.id,
      });
    }
    if (type == "town") {
      setFormData({
        ...formData,
        town: item.city_id,
      });
    }

    setOpenDropdown("");
  }

  async function handelClickPhotoImg() {
    // @ts-ignore
    document.getElementById("photoSelect").click();
  }
  const onFilechange = (event: any) => {
    setSelectPhoto(event.target.files[0]);
  };
  function formValidation() {
    let formErrors: any = {};
    let formIsValid = true;
    if (!formData.title) {
      formIsValid = false;
      formErrors["title"] = true;
    }
    if (!formData.theme) {
      formIsValid = false;
      formErrors["theme"] = true;
    }
    if (!formData.guy) {
      formIsValid = false;
      formErrors["guy"] = true;
    }
    if (!formData.format) {
      formIsValid = false;
      formErrors["format"] = true;
    }
    if (!formData.town) {
      formIsValid = false;
      formErrors["town"] = true;
    }
    if (!formData.year) {
      formIsValid = false;
      formErrors["year"] = true;
    }
    if (!selectPhoto?.name) {
      formIsValid = false;
      formErrors["document"] = "Anexar documento is required !";
    }
    setFormErrors(formErrors);
    return formIsValid;
  }

  async function submitForm() {
    if (formValidation()) {
      setIsLoading(true);
      let formdataSave = new FormData();
      formdataSave.append("resume_id", resumeData.resume_id);
      formdataSave.append("title", formData.title);
      formdataSave.append("theme", formData.theme);
      formdataSave.append("guy", formData.guy);
      formdataSave.append("format", formData.format);
      formdataSave.append("town", formData.town);
      formdataSave.append("year", formData.year);
      formdataSave.append("document", selectPhoto);
      const header = { "Content-Type": "multipart/form-data" };
      const { data } = await apiCall(
        "POST",
        ApiEndPoint.ADDPUBLICATIONS,
        formdataSave,
        header
      );
      if (data.status == 200) {
        setIsLoading(false);
        successToast(data.message);
        cleanField();
        getPublicationList(offset);
      } else {
        setIsLoading(false);
        errorToast(data.message);
      }
    }
  }

  async function getPublicationList(ofset = 0) {
    const resData: any = await localStorage.getItem("resumeData");
    const val = JSON.parse(resData);
    const params = {
      resume_id: val ? val.resume_id : 0,
      offset: ofset,
      limit: 10,
    };
    setIsLoading(true);
    const { data } = await apiCall("POST", ApiEndPoint.GETPUBLICATIONS, params);
    if (data.status == 200) {
      setListArray(data.data);
      setIsLoading(false);
      setBaseUrl(data.base_url);
    } else {
      setListArray([]);
      errorToast(data.message);
      setIsLoading(false);
    }
  }
  const deleteEdu = async () => {
    const params = {
      resume_id: resumeData.resume_id,
      publications_id: editData.publications_id,
    };
    setIsLoading(true);
    const { data } = await apiCall(
      "POST",
      ApiEndPoint.DELETEPUBLICATIONS,
      params
    );
    if (data.status == 200) {
      setDeleteEduOpen(false);
      getPublicationList(offset);
      setIsLoading(false);
      setEditData({});
      successToast(data.message);
    } else {
      setDeleteEduOpen(false);
      setIsLoading(false);
      setEditData({});
      errorToast(data.message);
    }
  };

  function cleanField() {
    setFormData({
      resume_id: "",
      title: "",
      theme: "",
      guy: "",
      format: "",
      town: "",
      year: "",
    });
    setSelectPhoto({});
    setGuy("");
    setTown("");
    setFormat("");
    return true;
  }
  const handlePaginationChange = (e: any, { activePage }: any) => {
    setActivePage(activePage);

    const offst = limit * activePage;
    setOffset(offst);
    getPublicationList(offst);
  };
  return (
    <div>
      {isLoading && <Loader />}

      <Container fluid>
        <ViewModel
          viewEduOpen={viewEduOpen}
          setViewEduOpen={setViewEduOpen}
          image={baseUrl + editData?.document}
        />
        <EditAgregarPublicacionesModel
          editEduOpen={editEduOpen}
          setEditEduOpen={setEditEduOpen}
          editData={editData}
          masterData={props.masterData}
          setEditData={setEditData}
          getPublicationList={getPublicationList}
          citiesData={props.citiesData}
          setIsLoading={setIsLoading}
        />
        <DeleteEducationjurados
          deleteEduOpen={deleteEduOpen}
          setDeleteEduOpen={setDeleteEduOpen}
          deleteEdu={deleteEdu}
        />

        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column className="form--left-box mob_sidebar" id={`${sidebarShow ? 'show__sidebar' : 'hide__sidebar'}`}>
              <Sidebar setSidebarShow={setSidebarShow} sidebarShow={sidebarShow} />
            </Grid.Column>
            <Grid.Column className="form--right-box" >
              <HeaderMenu setSidebarShow={setSidebarShow} sidebarShow={sidebarShow} />
              <Grid style={{ width: "100%", margin: 0 }}>
                <Grid.Column style={{ maxWidth: "99%" }}>
                  <Form size="large">
                    <Segment>
                      <Header
                        as="h4"
                        className="jura--form-heading"
                        floated="left"
                      >
                        Publicaciones -{" "}
                        <small>Todos los campos son obligatorios</small>
                      </Header>
                      <Divider clearing />
                      <Grid columns={2}>
                        <Grid.Row>
                          <Grid.Column>
                            <label>Titulo de la publicación</label>
                            <Form.Input
                              fluid
                              placeholder=""
                              name="numero_documento"
                              type="text"
                              value={formData?.title}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  title: e.target.value,
                                })
                              }
                              error={!formData.title && formErrors?.title}
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <label>Tema</label>
                            <Form.Input
                              fluid
                              placeholder=""
                              name="numero_documento"
                              type="text"
                              value={formData?.theme}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  theme: e.target.value,
                                })
                              }
                              error={!formData.theme && formErrors?.theme}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>

                      <Grid columns={4}>
                        <Grid.Row>
                          <Grid.Column>
                            <label>Tipo</label>
                            {// @ts-ignore
                              <Form.Select
                                className="select--val"
                                placeholder={guy == "" ? formData?.guy : guy}
                                onClick={() => handelDropdown("guy")}
                                error={!formData.guy && formErrors?.guy}
                              />
                            }
                            {openDropdown && openDropdown == "guy" ? (
                              <Grid columns={1} className="select__box">
                                <Grid.Row>
                                  <Grid.Column className="select__box_clm">
                                    <Grid>
                                      {masterFilter("guy").map((item: any, i: any) => {
                                        return (
                                          <p
                                            key={i}
                                            className={`form-slct ${formData?.guy == item.id
                                              ? "active"
                                              : ""
                                              }`}
                                          >
                                            <p
                                              className="form-slct_text"
                                              onClick={() => (
                                                setGuy(item.text),
                                                handleSelectChange("guy", item)
                                              )}
                                            >
                                              {item.text}{" "}
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
                          </Grid.Column>

                          <Grid.Column>
                            <label>Formato</label>
                            {// @ts-ignore
                              <Form.Select
                                className="select--val"
                                placeholder={
                                  format == "" ? formData?.format : format
                                }
                                onClick={() => handelDropdown("format")}
                                error={!formData.format && formErrors?.format}
                              />
                            }
                            {openDropdown && openDropdown == "format" ? (
                              <Grid columns={1} className="select__box">
                                <Grid.Row>
                                  <Grid.Column className="select__box_clm">
                                    <Grid>
                                      {masterFilter("format").map((item: any, i: any) => {
                                        return (
                                          <p
                                            key={i}
                                            className={`form-slct ${formData?.town == item.id
                                              ? "active"
                                              : ""
                                              }`}
                                          >
                                            <p
                                              className="form-slct_text"
                                              onClick={() => (
                                                setFormat(item.text),
                                                handleSelectChange(
                                                  "format",
                                                  item
                                                )
                                              )}
                                            >
                                              {item.text}{" "}
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
                          </Grid.Column>
                          <Grid.Column>
                            <label>Ciudad</label>
                            {// @ts-ignore
                              <Form.Select
                                className="select--val"
                                placeholder={town == "" ? formData?.town : town}
                                onClick={() => handelDropdown("town")}
                                error={!formData.town && formErrors?.town}
                              />
                            }

                            {openDropdown && openDropdown == "town" ? (
                              <Grid columns={1} className="select__box">
                                <Grid.Row>
                                  <Grid.Column className="select__box_clm">
                                    <Grid>
                                      {props?.citiesData.map((item: any, i: any) => {
                                        return (
                                          <p
                                            key={i}
                                            className={`form-slct ${formData?.town == item.city_id
                                              ? "active"
                                              : ""
                                              }`}
                                          >
                                            <p
                                              className="form-slct_text"
                                              onClick={() => (
                                                setTown(item.city_name),
                                                handleSelectChange("town", item)
                                              )}
                                            >
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
                          </Grid.Column>
                          <Grid.Column>
                            <label>Año</label>
                            <Form.Input
                              value={formData?.year}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  year: e.target.value,
                                })
                              }
                              required={true}
                              error={!formData.year && formErrors?.year}
                              fluid
                              placeholder=""
                              name=""
                              type="number"
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>

                      <Grid columns={1}>
                        <Grid.Row>
                          <Grid.Column>
                            <Form className="form--dec-input">
                              <label>Anexar documento</label>
                              <Input
                                type="file"
                                id="photoSelect"
                                onChange={(e) => onFilechange(e)}
                                style={{ display: "none" }}
                              />
                              <div
                                className="curser-pointer"
                                onClick={() => handelClickPhotoImg()}
                              >
                                <Input
                                  label={{ basic: true, content: "Adjuntar" }}
                                  labelPosition="right"
                                  placeholder=""
                                  value={
                                    selectPhoto?.name ? selectPhoto?.name : ""
                                  }
                                  className={`usr--img-input input-ful-w
                          ${!selectPhoto &&
                                    formErrors?.document &&
                                    "activeBorder"
                                    }`}
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
                                onClick={submitForm}
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
                        Mis Publicaciones
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
                                    <span>Nombre Publicación</span>
                                  </div>
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Tema
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Tipo
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Formato
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Ciudad
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Ano
                                </Table.HeaderCell>
                                <Table.HeaderCell className="headcol2">
                                  Acciones
                                </Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>
                            <Table.Body>
                              {listArray &&
                                listArray.map((item: any, i: any) => {
                                  return (
                                    <Table.Row>
                                      <Table.Cell className="headcol">
                                        <div className="display-flex">
                                          <span>{i + 1}</span>
                                          <span>{item.title}</span>
                                        </div>
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.theme}
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.guy_text}
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.format_text}
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.town_name}
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.year}
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
                              onClick={() => props.goBack(7)}
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <Grid className="form--buton-box mt-1">
                              <Button
                                onClick={() =>
                                  isEdit
                                    ? props.onPressEdit(10, false)
                                    : listArray.length > 0
                                      ? props.setShowPage(9)
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

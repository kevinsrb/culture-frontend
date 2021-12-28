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
  errorToast,
  successToast,
} from "../../../../utils/httpClient";
import ViewModel from "../../../Popupmodel/ViewEducationjurados";
import EditAgregarExperienciaComoJurado from "../../../Popupmodel/EditAgregarExperienciaComoJurado";
import DeleteEducationjurados from "../../../Popupmodel/DeleteEducationjurados";
import Loader from "../../../../components/loader";
import Sidebar from "../../../../components/NavBar";
import HeaderMenu from "../../../../components/Header";

export default function AgregarExperienciaComoJurado(props: any) {
  const { isEdit } = props;

  const [viewEduOpen, setViewEduOpen] = useState<any>(false);
  const [editEduOpen, setEditEduOpen] = useState<any>(false);
  const [deleteEduOpen, setDeleteEduOpen] = useState<any>(false);
  const [resumeData, setResumeData] = useState<any>({});
  const [selectPhoto, setSelectPhoto] = useState<any>(null);
  const [formErrors, setFormErrors] = useState<any>();
  const [openDropdown, setOpenDropdown] = useState<any>("");
  const [listArray, setListArray] = useState<any>([]);
  const [baseUrl, setBaseUrl] = useState<any>("");
  const [editData, setEditData] = useState<any>({});
  const [town, setTown] = useState<any>("");
  const [isLoading, setIsLoading] = useState<any>(false);
  const [area, setArea] = useState<any>("");
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
    name: "",
    entity: "",
    town: "",
    year: "",
    area: "",
  });

  const masterFilter = (type: any) =>
    (props.masterData &&
      props.masterData.filter((item: any) => item.type == type)) ||
    [];

  useEffect(() => {
    setResumeDetail();
    getJuryList(offset);
  }, []);

  async function setResumeDetail() {
    const resData = await localStorage.getItem("resumeData");
    // @ts-ignore

    const val = JSON.parse(resData);
    await setResumeData(val);
  }

  async function getJuryList(ofst = 0) {
    const resData = await localStorage.getItem("resumeData");
    setIsLoading(true);
    // @ts-ignore
    const val = JSON.parse(resData);
    const params = {
      resume_id: val ? val.resume_id : 0,
      offset: ofst,
      limit: 10,
    };
    const { data } = await apiCall(
      "POST",
      ApiEndPoint.GETJURYEXPERIENCE,
      params
    );
    if (data.status == 200) {
      setIsLoading(false);
      setListArray(data.data);
      setBaseUrl(data.base_url);
    } else {
      setIsLoading(false);
      setListArray([]);
      errorToast(data.message);
    }
  }
  async function handelDropdown(type: any) {
    const valDro = openDropdown == type ? "" : openDropdown != type ? type : "";
    setOpenDropdown(valDro);
  }
  async function handleSelectChange(type: any, item: any) {
    if (type == "town") {
      setFormData({
        ...formData,
        town: item.city_id,
      });
    }
    if (type == "area") {
      setFormData({
        ...formData,
        area: item.id,
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

    if (!formData.name) {
      formIsValid = false;
      formErrors["name"] = true;
    }
    if (!formData.entity) {
      formIsValid = false;
      formErrors["entity"] = true;
    }
    if (!formData.town) {
      formIsValid = false;
      formErrors["town"] = true;
    }
    if (!formData.year) {
      formIsValid = false;
      formErrors["year"] = true;
    }
    if (!formData.area) {
      formIsValid = false;
      formErrors["area"] = true;
    }
    console.log("formData: ", selectPhoto);
    if (!selectPhoto?.name) {
      formIsValid = false;
      formErrors["document"] = true;
    }
    setFormErrors(formErrors);
    return formIsValid;
  }
  async function submitForm() {
    if (formValidation()) {
      setIsLoading(true);

      let formdataSave = new FormData();
      formdataSave.append("resume_id", resumeData.resume_id);
      formdataSave.append("name", formData.name);
      formdataSave.append("entity", formData.entity);
      formdataSave.append("town", formData.town);
      formdataSave.append("year", formData.year);
      formdataSave.append("area", formData.area);
      formdataSave.append("document", selectPhoto);
      const header = { "Content-Type": "multipart/form-data" };
      const { data } = await apiCall(
        "POST",
        ApiEndPoint.ADDNJURYEXPERIENCE,
        formdataSave,
        header
      );
      if (data.status == 200) {
        setIsLoading(false);
        successToast(data.message);
        cleanField();
        getJuryList(offset);
      } else {
        setIsLoading(false);
        errorToast(data.message);
      }
    }
  }

  const deleteEdu = async () => {
    const params = {
      resume_id: resumeData.resume_id,
      jury_experience_id: editData.jury_experience_id,
    };
    setIsLoading(true);
    const { data } = await apiCall(
      "POST",
      ApiEndPoint.DELETEJURYEXPERIENCE,
      params
    );
    if (data.status == 200) {
      setDeleteEduOpen(false);
      getJuryList(offset);
      setEditData({});
      setIsLoading(false);
      successToast(data.message);
    } else {
      setDeleteEduOpen(false);
      setEditData({});
      setIsLoading(false);
      errorToast(data.message);
    }
  };
  function cleanField() {
    setFormData({
      resume_id: "",
      name: "",
      entity: "",
      town: "",
      year: "",
      area: "",
    });
    setArea("");
    setTown("");
    setSelectPhoto({});
  }
  // @ts-ignore
  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);

    const offst = limit * activePage;
    setOffset(offst);
    getJuryList(offst);
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
          image={baseUrl + editData?.document}
        />
        <EditAgregarExperienciaComoJurado
          editEduOpen={editEduOpen}
          setEditEduOpen={setEditEduOpen}
          editData={editData}
          masterData={props.masterData}
          setEditData={setEditData}
          getJuryList={getJuryList}
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
                        Experiencia Como Jurado-{" "}
                        <small>Todos los campos son obligatorios</small>
                      </Header>
                      <Divider clearing />

                      <Grid columns={2}>
                        <Grid.Row>
                          <Grid.Column>
                            <label>Nombre de la convocatoria</label>
                            <Form.Input
                              fluid
                              placeholder=""
                              name="numero_documento"
                              type="text"
                              value={formData?.name}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                })
                              }
                              error={!formData.name && formErrors?.name}
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <label>Entidad</label>
                            <Form.Input
                              fluid
                              placeholder=""
                              name="numero_documento"
                              type="text"
                              value={formData?.entity}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  entity: e.target.value,
                                })
                              }
                              error={!formData.entity && formErrors?.entity}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>

                      <Grid columns={2}>
                        <Grid.Row>
                          <Grid.Column>
                            <Grid columns={2}>
                              <Grid.Row>
                                <Grid.Column className="p_0">
                                  <label>Ciudad</label>
                                  {// @ts-ignore
                                    <Form.Select
                                      className="select--val"
                                      placeholder={
                                        town == "" ? formData?.town : town
                                      }
                                      onClick={() => handelDropdown("town")}
                                      required={true}
                                      error={!formData.town && formErrors?.town}
                                    />
                                  }

                                  {openDropdown && openDropdown == "town" ? (
                                    <Grid columns={1} className="select__box">
                                      <Grid.Row>
                                        <Grid.Column className="select__box_clm">
                                          <Grid>
                                            {props?.citiesData.map(
                                              (item: any, i: any) => {
                                                return (
                                                  <p
                                                    key={i}
                                                    className={`form-slct ${formData?.town ==
                                                      item.city_id
                                                      ? "active"
                                                      : ""
                                                      }`}
                                                  >
                                                    <p
                                                      className="form-slct_text"
                                                      onClick={() => (
                                                        setTown(item.city_name),
                                                        handleSelectChange(
                                                          "town",
                                                          item
                                                        )
                                                      )}
                                                    >
                                                      {item.city_name}{" "}
                                                    </p>
                                                  </p>
                                                );
                                              }
                                            )}
                                          </Grid>
                                        </Grid.Column>
                                      </Grid.Row>
                                    </Grid>
                                  ) : (
                                    ""
                                  )}
                                </Grid.Column>
                                <Grid.Column className="p_0">
                                  <label>Año</label>
                                  <Form.Input
                                    fluid
                                    placeholder=""
                                    name="numero_documento"
                                    type="number"
                                    value={formData?.year}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        year: e.target.value,
                                      })
                                    }
                                    required={true}
                                    error={!formData.year && formErrors?.year}
                                  />
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Grid.Column>
                          <Grid.Column>
                            <label>Área</label>
                            {// @ts-ignore

                              < Form.Select
                                className="select--val"
                                placeholder={area == "" ? formData?.area : area}
                                onClick={() => handelDropdown("area")}
                                required={true}
                                error={!formData.area && formErrors?.area}
                              />
                            }

                            {openDropdown && openDropdown == "area" ? (
                              <Grid columns={1} className="select__box">
                                <Grid.Row>
                                  <Grid.Column className="select__box_clm">
                                    <Grid>
                                      {masterFilter("area").map((item: any, i: any) => {
                                        return (
                                          <p
                                            key={i}
                                            className={`form-slct ${formData?.area == item.id
                                              ? "active"
                                              : ""
                                              }`}
                                          >
                                            <p
                                              className="form-slct_text"
                                              onClick={() => (
                                                setArea(item.text),
                                                handleSelectChange("area", item)
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
                        </Grid.Row>
                      </Grid>

                      <Grid columns={1}>
                        <Grid.Row>
                          <Grid.Column className="p_0">
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
                                  width={60}
                                  style={{ width: "91%" }}
                                  className={`usr--img-input input-ful-w
                            ${!selectPhoto &&
                                    formErrors?.document &&
                                    "activeBorder"
                                    }`}
                                // onClick={() => handelClickPhotoImg()}
                                // required={true}
                                // error={!formData.document && formErrors?.document}
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
                        Mis Experiencias Como Jurado
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
                                    <span>Nombre Convocatoria</span>
                                  </div>
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Entidad
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Ciudad
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Año
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Área
                                </Table.HeaderCell>
                                {/* <Table.HeaderCell className="col--head">
                            Anexo
                          </Table.HeaderCell> */}
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
                                          <span>{item.name}</span>
                                        </div>
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.entity}
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.town_name}
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.year}
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.area_text}
                                      </Table.Cell>
                                      {/* <Table.Cell className="col--bdy-text">
                                  Nombre Entidad
                                </Table.Cell> */}
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
                                  // onPageChange={handlePaginationChange}
                                  onClick={handlePaginationChange}
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
                              onClick={() => props.goBack(5)}
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <Grid className="form--buton-box mt-1">
                              <Button
                                onClick={() =>
                                  isEdit
                                    ? props.onPressEdit(10, false)
                                    : listArray.length > 0
                                      ? props.setShowPage(7)
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

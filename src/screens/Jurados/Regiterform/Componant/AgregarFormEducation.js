import React, { useState, useEffect } from "react";
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
  Pagination
} from "semantic-ui-react";
import ApiEndPoint from "../../../../utils/apiEndPoints";
import {
  apiCall,
  errorToast,
  successToast,
} from "../../../../utils/httpClient";
import ViewModel from "../../../Popupmodel/ViewEducationjurados";
import EditAgregarFormEducationModel from "../../../Popupmodel/EditAgregarFormEducationModel";
import DeleteEducationjurados from "../../../Popupmodel/DeleteEducationjurados";
import DatePicker from "react-date-picker";
import moment from "moment";
import Loader from "../../../../components/loader";
import Sidebar from '../../../../components/NavBar';
import HeaderMenu from '../../../../components/Header';

export default function AgregarFormEducation(props) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [viewEduOpen, setViewEduOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [editEduOpen, setEditEduOpen] = React.useState(false);
  const [deleteEduOpen, setDeleteEduOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [resumeData, setResumeData] = useState({});
  const [selectPhoto, setSelectPhoto] = useState(null);
  const [formErrors, setFormErrors] = useState();
  const [nonFormalEducationList, setNonFormalEducationList] = useState([]);
  const [baseUrl, setBaseUrl] = useState("");
  const [editData, setEditData] = useState({});
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [boundaryRange, setboundaryRange] = useState(1);
  const [siblingRange, setsiblingRange] = useState(1);
  const [showEllipsis, setshowEllipsis] = useState(true);
  const [showFirstAndLastNav, setshowFirstAndLastNav] = useState(true);
  const [showPreviousAndNextNav, setshowPreviousAndNextNav] = useState(true);

  const [formData, setFormData] = useState({
    resume_id: "",
    guy: "",
    modality: "",
    name: "",
    institution: "",
    start_date: "",
    finish_date: "",
    hours: "",
    town: "",
  });
  const [guy, setGuy] = useState("");
  const [modality, setModality] = useState("");
  const [town, setTown] = useState("");
  useEffect(() => {
    setResumeDetail();
    getNonFormalEducationData(offset);
  }, []);

  async function setResumeDetail() {
    const resData = await localStorage.getItem("resumeData");
    const val = JSON.parse(resData);
    await setResumeData(val);
  }
  const masterFilter = (type) =>
    (props.masterData &&
      props.masterData.filter((item) => item.type == type)) ||
    [];
  async function handelDropdown(type) {
    const valDro = openDropdown == type ? "" : openDropdown != type ? type : "";
    setOpenDropdown(valDro);
  }
  async function handleSelectChange(type, item) {
    if (type == "guy") {
      setFormData({
        ...formData,
        guy: item.id,
      });
    }
    if (type == "modality") {
      setFormData({
        ...formData,
        modality: item.id,
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
    document.getElementById("photoSelect").click();
  }
  const onFilechange = (event) => {
    setSelectPhoto(event.target.files[0]);
  };
  function formValidation(item) {
    let formErrors = {};
    let formIsValid = true;

    if (!formData.guy) {
      formIsValid = false;
      formErrors["guy"] = true;
    }

    if (!formData.modality) {
      formIsValid = false;
      formErrors["modality"] = true;
    }

    if (!formData.name) {
      formIsValid = false;
      formErrors["name"] = true;
    }
    if (!formData.hours) {
      formIsValid = false;
      formErrors["hours"] = true;
    }
    if (!formData.town) {
      formIsValid = false;
      formErrors["town"] = true;
    }
    if (!selectPhoto) {
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
      formdataSave.append("guy", formData.guy);
      formdataSave.append("modality", formData.modality);
      formdataSave.append("name", formData.name);
      formdataSave.append("institution", formData.institution);
      formdataSave.append("start_date", moment(startDate).format("DD-MM-YYYY"));
      formdataSave.append("finish_date", moment(endDate).format("DD-MM-YYYY"));
      formdataSave.append("hours", formData.hours);
      formdataSave.append("town", formData.town);
      formdataSave.append("document", selectPhoto);
      const header = { "Content-Type": "multipart/form-data" };
      const { data } = await apiCall(
        "POST",
        ApiEndPoint.ADDNONFORMALEDUCATION,
        formdataSave,
        header
      );
      if (data.status == 200) {
        setIsLoading(false);
        cleanField();
        successToast(data.message);
        getNonFormalEducationData(offset);
      } else {
        errorToast(data.message);
        setIsLoading(false);
      }
    }
  }
  async function getNonFormalEducationData(offst) {
    const resData = await localStorage.getItem("resumeData");
    const val = JSON.parse(resData);
    const params = {
      resume_id: val ? val.resume_id : 0,
      offset: offst,
      limit: 10,
    };
    // setIsLoading(true);
    const { data } = await apiCall(
      "POST",
      ApiEndPoint.GETNONFORMALEDUCATION,
      params
    );
    if (data.status == 200) {
      setNonFormalEducationList(data.data);
      // successToast(data.message);
      setBaseUrl(data.base_url);
      setIsLoading(false);
    } else {
      errorToast(data.message);
      setIsLoading(false);
    }
  }
  const deleteEdu = async () => {
    const params = {
      resume_id: resumeData.resume_id,
      non_formal_education_id: editData.non_formal_education_id,
    };
    setIsLoading(true);
    const { data } = await apiCall(
      "POST",
      ApiEndPoint.DELETENONFORMALEDUCATION,
      params
    );
    if (data.status == 200) {
      setDeleteEduOpen(false);
      getNonFormalEducationData(offset);
      successToast(data.message);
      setEditData({});
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setDeleteEduOpen(false);
      errorToast(data.message);
      setEditData({});
    }
  };

  function cleanField() {
    setFormData({
      guy: "",
      modality: "",
      name: "",
      institution: "",
      start_date: "",
      finish_date: "",
      hours: "",
      town: "",
    });
    setStartDate(new Date());
    setEndDate(new Date());
    setSelectPhoto({});
    setGuy("");
    setTown("");
    setModality("");
    return true;
  }

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage)

    const offst = limit * activePage;
    setOffset(offst);
    getNonFormalEducationData(offst)
  }
  return (
    <div>
      {isLoading && <Loader />}
      <Container fluid>
        <ViewModel
          viewEduOpen={viewEduOpen}
          setViewEduOpen={setViewEduOpen}
          editData={editData}
          baseUrl={baseUrl}
          image={baseUrl + editData?.annexed_file}
        />
        <EditAgregarFormEducationModel
          editEduOpen={editEduOpen}
          setEditEduOpen={setEditEduOpen}
          editData={editData}
          masterData={props.masterData}
          setEditData={setEditData}
          getNonFormalEducationData={getNonFormalEducationData}
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
            <Grid.Column className="form--left-box">
              <Sidebar />
            </Grid.Column>
            <Grid.Column className="form--right-box">
              <HeaderMenu />
              <Grid style={{ width: "100%", margin: 0 }}>
                <Grid.Column style={{ maxWidth: "99%" }}>
                  <Form size="large">
                    <Segment>
                      <Header as="h4" className="jura--form-heading" floated="left">
                        Agregar Educación No Formal -{" "}
                        <small>Todos los campos son obligatorios</small>
                      </Header>
                      <Divider clearing />
                      <Grid columns={4}>
                        <Grid.Row>
                          <Grid.Column>
                            <label>Tipo</label>
                            <Form.Select
                              className="select--val"
                              placeholder={guy == "" ? formData?.guy : guy}
                              onClick={() => handelDropdown("guy")}
                              error={!formData.guy && formErrors?.guy}
                            />
                            {openDropdown && openDropdown == "guy" ? (
                              <Grid columns={1} className="select__box">
                                <Grid.Row>
                                  <Grid.Column className="select__box_clm">
                                    <Grid>
                                      {masterFilter("guy").map((item, i) => {
                                        return (
                                          <p
                                            key={i}
                                            className={`form-slct ${formData?.guy == item.id ? "active" : ""
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
                            <label>Modalidad</label>
                            <Form.Select
                              className="select--val"
                              placeholder={
                                modality == "" ? formData?.modality : modality
                              }
                              onClick={() => handelDropdown("modality")}
                              required={true}
                              error={!formData.modality && formErrors?.modality}
                            />
                            {openDropdown && openDropdown == "modality" ? (
                              <Grid columns={1} className="select__box">
                                <Grid.Row>
                                  <Grid.Column className="select__box_clm">
                                    <Grid>
                                      {masterFilter("modality").map((item, i) => {
                                        return (
                                          <p
                                            key={i}
                                            className={`form-slct ${formData?.modality == item.id
                                                ? "active"
                                                : ""
                                              }`}
                                          >
                                            <p
                                              className="form-slct_text"
                                              onClick={() => (
                                                setModality(item.text),
                                                handleSelectChange("modality", item)
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
                            <label>Nombre</label>
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
                            <label>
                              Institución - <small>Opcional</small>
                            </label>
                            <Form.Input
                              fluid
                              placeholder=""
                              name="numero_documento"
                              type="text"
                              value={formData?.institution}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  institution: e.target.value,
                                })
                              }
                              error={!formData.institution && formErrors?.institution}
                            />
                            {formErrors && formErrors.institution && (
                              <small className="text-red">
                                {formErrors.institution}
                              </small>
                            )}
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                      <Grid columns={1}>
                        <Grid.Row>
                          <Grid.Column>
                            <Grid columns={4}>
                              <Grid.Row>
                                <Grid.Column className="p_0">
                                  <label>Fecha de inicio</label>
                                  <DatePicker
                                    onChange={setStartDate}
                                    value={startDate}
                                    className="date_pkr"
                                  />

                                  {formErrors && formErrors.start_date && (
                                    <small className="text-red">
                                      {formErrors.start_date}
                                    </small>
                                  )}
                                </Grid.Column>
                                <Grid.Column className="p_0">
                                  <label>Fecha de terminación</label>
                                  <DatePicker
                                    onChange={setEndDate}
                                    value={endDate}
                                    className="date_pkr"
                                  />
                                  {formErrors && formErrors.finish_date && (
                                    <small className="text-red">
                                      {formErrors.finish_date}
                                    </small>
                                  )}
                                </Grid.Column>

                                <Grid.Column className="p_0">
                                  <label>Número de horas</label>
                                  <Form.Input
                                    fluid
                                    placeholder=""
                                    name="numero_documento"
                                    type="number"
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        hours: e.target.value,
                                      })
                                    }
                                    value={formData?.hours}
                                    error={!formData.hours && formErrors?.hours}
                                  />
                                </Grid.Column>

                                <Grid.Column className="p_0">
                                  <label>Ciudad</label>
                                  <Form.Select
                                    className="select--val"
                                    placeholder={town == "" ? formData?.town : town}
                                    onClick={() => handelDropdown("town")}
                                    required={true}
                                    error={!formData.town && formErrors?.town}
                                  />
                                  {openDropdown && openDropdown == "town" ? (
                                    <Grid columns={1} className="select__box">
                                      <Grid.Row>
                                        <Grid.Column className="select__box_clm">
                                          <Grid>
                                            {props?.citiesData.map((item, i) => {
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
                              </Grid.Row>
                            </Grid>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                      <Grid columns={1}>
                        <Grid.Row>
                          <Grid.Column>
                            <Form className="form--dec-input">
                              <label>Anexo</label>
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
                                  className={`usr--img-input curser-pointer
                            ${!selectPhoto &&
                                    formErrors?.document &&
                                    "activeBorder"
                                    }`}
                                  value={selectPhoto?.name ? selectPhoto?.name : ""}
                                  required={true}
                                  error={formErrors?.document}
                                  style={{width:'91%'}}
                                />
                              </div>
                            </Form>
                            {formErrors && formErrors.document && (
                              <small className="text-red">
                                {!selectPhoto && formErrors.document}
                              </small>
                            )}
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
                                onClick={() => submitForm()}
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
                      <Header as="h4" className="jura--form-heading" floated="left">
                        Mis educaciones formales
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
                                    <span>Tipo</span>
                                  </div>
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Modalidad
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Nombre
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Institución
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Fecha graduación
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Fecha de terminación
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Institución educativa
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
                              {nonFormalEducationList &&
                                nonFormalEducationList.map((item, i) => {
                                  return (
                                    <Table.Row>
                                      <Table.Cell className="headcol">
                                        <div className="display-flex">
                                          <span>{i + 1}</span>
                                          <span>{item.guy_text}</span>
                                        </div>
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.modality_text}
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.name}
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.institution}
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.start_date}
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.finish_date}
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.hours}
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.town_name}{" "}
                                      </Table.Cell>
                                      <Table.Cell className="headcol2">
                                        <Icon
                                          onClick={() => (
                                            setViewEduOpen(true), setEditData(item)
                                          )}
                                          name="eye"
                                        />
                                        <Icon
                                          onClick={() => (
                                            setEditEduOpen(true), setEditData(item)
                                          )}
                                          name="pencil alternate"
                                        />
                                        <Icon
                                          onClick={() => (
                                            setDeleteEduOpen(true), setEditData(item)
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
                                  size='mini'
                                  siblingRange={siblingRange}
                                  totalPages={totalPages}
                                  ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                                  firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                                  lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                                  prevItem={{ content: <Icon name='angle left' />, icon: true }}
                                  nextItem={{ content: <Icon name='angle right' />, icon: true }}
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
                              onClick={() => props.goBack(3)}
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <Grid className="form--buton-box mt-1">
                              <Button
                                onClick={() =>
                                  nonFormalEducationList.length > 0
                                    ? props.setShowPage(5)
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

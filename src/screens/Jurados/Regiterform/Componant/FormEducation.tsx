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
  Menu,
  Icon,
  Pagination,
} from "semantic-ui-react";
import ViewModel from "../../../Popupmodel/ViewEducationjurados";
import EditEducationjurados from "../../../Popupmodel/EditEducationjurados";
import DeleteEducationjurados from "../../../Popupmodel/DeleteEducationjurados";
import ApiEndPoint from "../../../../utils/apiEndPoints";
import {
  apiCall,
  errorToast,
  successToast,
} from "../../../../utils/httpClient";
import DatePicker from "react-date-picker";
import moment from "moment";
import Loader from "../../../../components/loader";
import ReactDOM from "react-dom";
// import ReactPaginate from "react-paginate";
import Sidebar from "../../../../components/NavBar";
import HeaderMenu from "../../../../components/Header";

export default function FormEducation(props: any) {
  const { isEdit } = props;

  const [selectDate, setSelectDate] = useState<any>(new Date());
  const [activeIndex, setActiveIndex] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [viewEduOpen, setViewEduOpen] = React.useState<any>(false);
  const [editEduOpen, setEditEduOpen] = React.useState<any>(false);
  const [deleteEduOpen, setDeleteEduOpen] = React.useState<any>(false);
  const [selectGender, setSelectGender] = React.useState<any>(0);
  const [openDropdown, setOpenDropdown] = useState<any>("");
  const [placeEducation, setPlaceEducation] = useState<any>("");
  const [placeTown, setPlaceTown] = useState<any>("");
  const [valueda, setvalueda] = useState<any>("");
  const [identityDocument, setIdentityDocument] = useState<any>(null);
  const [formErrors, setFormErrors] = useState<any>([]);
  const [formalEducationData, setFormalEducationData] = useState<any>([]);
  const [resumeData, setResumeData] = useState<any>({});
  const [editData, setEditData] = useState<any>({});
  const [baseUrl, setBaseUrl] = useState<any>("");
  const [selectPhoto, setSelectPhoto] = useState<any>(null);
  const [limit, setLimit] = useState<any>(10);
  const [offset, setOffset] = useState<any>(0);
  const [totalPages, setTotalPages] = useState<any>(1);
  const [activePage, setActivePage] = useState<any>(1);
  const [boundaryRange, setboundaryRange] = useState<any>(1);
  const [siblingRange, setsiblingRange] = useState<any>(1);
  const [showEllipsis, setshowEllipsis] = useState<any>(true);
  const [showFirstAndLastNav, setshowFirstAndLastNav] = useState<any>(true);
  const [showPreviousAndNextNav, setshowPreviousAndNextNav] = useState<any>(true);

  useEffect(() => {
    setResumeDetail();
    getFormalEducationData(offset);
  }, []);

  async function setResumeDetail() {
    const resData: any = await localStorage.getItem("resumeData");
    const val = JSON.parse(resData);
    await setResumeData(val);
  }

  const [formData, setFormData] = useState<any>({
    resume_id: resumeData ? resumeData.resume_id : 10,
    education_level: 0,
    qualification: "",
    educational_institution: "",
    town: "",
    graduate_status: 1,
    date_graduation: new Date(),
  });



  async function handelDropdown(type: any) {
    const valDro = openDropdown == type ? "" : openDropdown != type ? type : "";
    setOpenDropdown(valDro);
  }

  async function handleSelectChange(type: any, item: any) {
    if (type == "education") {
      setFormData({
        ...formData,
        education_level: item.id,
      });
    }
    if (type == "town") {
      setFormData({
        ...formData,
        town: item.city_id,
      });
    }

    setvalueda(item.value);
    setOpenDropdown("");
  }


  function formValidation() {
    let formErrors: any = {};
    let formIsValid = true;

    if (!formData.education_level) {
      formIsValid = false;
      formErrors["education_level"] = true; //"Nivel de educación. is required !";
    }
    if (!formData.qualification) {
      formIsValid = false;
      formErrors["qualification"] = true;
    }
    if (!formData.educational_institution) {
      formIsValid = false;
      formErrors["educational_institution"] = true;
    }
    if (!formData.town) {
      formIsValid = false;
      formErrors["town"] = true;
    }
    if (!formData.graduate_status) {
      formIsValid = false;
      formErrors["graduate_status"] = true;
    }
    if (!formData.date_graduation) {
      formIsValid = false;
      formErrors["date_graduation"] = true;
    }
    if (!selectPhoto) {
      formIsValid = false;
      formErrors["document"] = true;
    }

    setFormErrors(formErrors);
    return formIsValid;
  }

  async function formSubmit() {
    if (formValidation()) {
      setIsLoading(true);
      let formdataSave = new FormData();
      formdataSave.append("resume_id", resumeData.resume_id);
      formdataSave.append("education_level", formData.education_level);
      formdataSave.append("qualification", formData.qualification);
      formdataSave.append(
        "educational_institution",
        formData.educational_institution
      );
      formdataSave.append("town", formData.town);
      formdataSave.append("graduate_status", formData.graduate_status);
      formdataSave.append(
        "date_graduation",
        moment(selectDate).format("DD-MM-YYYY")
      );
      formdataSave.append("document", selectPhoto);
      const header = { "Content-Type": "multipart/form-data" };

      const { data } = await apiCall(
        "POST",
        ApiEndPoint.ADDFORMALEDUCATION,
        formdataSave,
        header
      );
      if (data.status == 200) {
        setIsLoading(false);
        getFormalEducationData(offset);
        cleanDetails();
        successToast(data.message);
      } else {
        errorToast(data.message);
        setIsLoading(false);
      }
    }
  }
  async function getFormalEducationData(offsetVal: any) {
    const resData: any = await localStorage.getItem("resumeData");
    const val = JSON.parse(resData);
    const params = {
      resume_id: val ? val.resume_id : 0,
      offset: offsetVal,
      limit: limit,
    };
    setIsLoading(true);

    const { data } = await apiCall(
      "POST",
      ApiEndPoint.GETFORMALEDUCATIONLIST,
      params
    );

    if (data.status == 200) {
      setIsLoading(false);
      // successToast(data.message)
      setFormalEducationData(data.data);
      setBaseUrl(data.base_url);
      setTotalPages(data.total_row / limit);
    } else {
      setIsLoading(false);
      errorToast(data.message);
      setFormalEducationData([]);
    }
  }

  const masterFilter = (type: any) =>
    (props.masterData &&
      props.masterData.filter((item: any) => item.type == type)) ||
    [];

  const deleteEdu = async () => {
    const params = {
      resume_id: resumeData.resume_id.toString(),
      education_id: editData.education_id,
    };
    setIsLoading(true);
    const { data } = await apiCall(
      "POST",
      ApiEndPoint.DELETEEDUCATIONDATA,
      params
    );
    if (data.status == 200) {
      setIsLoading(false);
      setDeleteEduOpen(false);
      getFormalEducationData(offset);
      successToast(data.message);
      setEditData({});
    } else {
      setIsLoading(false);
      setDeleteEduOpen(false);
      errorToast(data.message);
      setEditData({});
    }
  };

  async function handelClickPhotoImg() {
    //@ts-ignore
    document.getElementById("photoSelect").click();
  }
  const onFilechange = (event: any) => {
    // console.log("event: ", event.target);
    setSelectPhoto(event.target.files[0]);
  };

  function cleanDetails() {
    setFormData({
      education_level: 0,
      qualification: "",
      educational_institution: "",
      town: "",
      graduate_status: 1,
      date_graduation: new Date(),
    });
    setSelectPhoto({});
    setPlaceEducation("");
    setPlaceTown("");
  }
  const handlePaginationChange = (e: any, { activePage }: any) => {
    setActivePage(activePage);

    const offst = limit * activePage;
    setOffset(offst);
    getFormalEducationData(offst);
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
        <EditEducationjurados
          editEduOpen={editEduOpen}
          setEditEduOpen={setEditEduOpen}
          editData={editData}
          masterData={props.masterData}
          setEditData={setEditData}
          getFormalEducationData={getFormalEducationData}
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
                      <Header
                        as="h4"
                        className="jura--form-heading"
                        floated="left"
                      >
                        Agregar Educación Formal -{" "}
                        <small>Todos los campos son obligatorios</small>
                      </Header>
                      <Divider clearing />

                      <Grid columns={4}>
                        <Grid.Row>
                          <Grid.Column>
                            <label>Nivel de educación</label>

                            <Form.Field>
                              {//@ts-ignore
                                <Form.Select
                                  placeholder={placeEducation}
                                  onClick={() => handelDropdown("education")}
                                  className="select--val"
                                  required={true}
                                  error={
                                    !formData.education_level &&
                                    formErrors?.education_level
                                  }
                                />}
                              {openDropdown && openDropdown == "education" ? (
                                <Grid columns={1} className="select__box">
                                  <Grid.Row>
                                    <Grid.Column className="select__box_clm">
                                      <Grid>
                                        {masterFilter("education").map(
                                          (item: any, i: any) => {
                                            return (
                                              <p key={i} className="form-slct">
                                                <p
                                                  className="form-slct_text"
                                                  onClick={() => (
                                                    setPlaceEducation(
                                                      item.text
                                                    ),
                                                    handleSelectChange(
                                                      "education",
                                                      item
                                                    )
                                                  )}
                                                >
                                                  {item.text}{" "}
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
                            </Form.Field>
                          </Grid.Column>
                          <Grid.Column>
                            <label>Título</label>
                            <Form.Input
                              fluid
                              placeholder=""
                              name="numero_documento"
                              type="text"
                              value={formData.qualification}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  qualification: e.target.value,
                                })
                              }
                              required={true}
                              error={
                                !formData.qualification &&
                                formErrors?.qualification
                              }
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <label>Institución educativa</label>
                            <Form.Input
                              fluid
                              placeholder=""
                              name="numero_documento"
                              type="text"
                              value={formData?.educational_institution}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  educational_institution: e.target.value,
                                })
                              }
                              required={true}
                              error={
                                !formData.educational_institution &&
                                formErrors?.educational_institution
                              }
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <label>Ciudad</label>

                            <Form.Field>
                              {//@ts-ignore
                                <Form.Select
                                  placeholder={placeTown}
                                  onClick={() => handelDropdown("town")}
                                  className="select--val"
                                  required={true}
                                  error={!formData.town && formErrors?.town}
                                />
                              }
                              {openDropdown && openDropdown == "town" ? (
                                <Grid columns={1} className="select__box">
                                  <Grid.Row>
                                    <Grid.Column className="select__box_clm">
                                      <Grid>
                                        {props.citiesData &&
                                          props.citiesData.length &&
                                          props.citiesData.map((item:any, i:any) => {
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
                      <Grid columns={2}>
                        <Grid.Row>
                          <Grid.Column>
                            <Grid columns={2}>
                              <Grid.Row>
                                <Grid.Column
                                  className="p_0"
                                  style={{ display: "flex" }}
                                >
                                  <Form className="form--dec-input">
                                    <label>¿Graduado?</label>
                                    <Radio
                                      name="aa"
                                      value="1"
                                      label="Si"
                                      className="form--radi-btn"
                                      onClick={() =>
                                        setFormData({
                                          ...formData,
                                          graduate_status: 1,
                                        })
                                      }
                                      checked={
                                        formData.graduate_status == 1
                                          ? true
                                          : false
                                      }
                                    />
                                    <Radio
                                      name="aa"
                                      value="2"
                                      label="No"
                                      className="form--radi-btn"
                                      onClick={(e) =>
                                        setFormData({
                                          ...formData,
                                          graduate_status: 2,
                                        })
                                      }
                                      checked={
                                        formData.graduate_status == 2
                                          ? true
                                          : false
                                      }
                                    />
                                  </Form>
                                  {formErrors && formErrors.graduate_status && (
                                    <small className="text-red">
                                      {formErrors.graduate_status}
                                    </small>
                                  )}
                                </Grid.Column>
                                <Grid.Column className="p_0">
                                  <label>Fecha de graduación</label>
                                  <DatePicker
                                    onChange={setSelectDate}
                                    value={selectDate}
                                    className="date_pkr"
                                  />
                                  {formErrors && formErrors.date_graduation && (
                                    <small className="text-red">
                                      {formErrors.date_graduation}
                                    </small>
                                  )}
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Grid.Column>
                          <Grid.Column className="p_0">
                            <Form className="form--dec-input">
                              <Input
                                type="file"
                                id="photoSelect"
                                onChange={(e) => onFilechange(e)}
                                style={{ display: "none" }}
                              />
                              <label>Adjuntar diploma / certificación</label>
                              <div
                                onClick={() => handelClickPhotoImg()}
                                className="curser-pointer"
                              >
                                <Input
                                  label={{ basic: true, content: "Adjuntar" }}
                                  labelPosition="right"
                                  placeholder=""
                                  value={
                                    selectPhoto?.name ? selectPhoto?.name : ""
                                  }
                                  className={`usr--img-input ${!selectPhoto?.name &&
                                    formErrors?.document &&
                                    "activeBorder"
                                    }`}
                                  style={{ width: "82%" }}
                                />
                              </div>
                            </Form>
                            {/* {formErrors && formErrors.document && (
                        <small className="text-red">
                          {!selectPhoto && formErrors.document}
                        </small>
                      )} */}
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                      <Divider clearing />
                      <Grid columns={1}>
                        <Grid.Row>
                          <Grid.Column>
                            <Grid className="form--buton-box form--education mt-1">
                              <a
                                onClick={() => cleanDetails()}
                                className="link-font-text curser-pointer"
                              >
                                Limpiar campos
                              </a>
                              <Button
                                onClick={() => formSubmit()}
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
                                    <span>Título</span>
                                  </div>
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Nivel de educación
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Institución educativa
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Ciudad
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Graduado
                                </Table.HeaderCell>
                                <Table.HeaderCell className="col--head">
                                  Fecha graduación
                                </Table.HeaderCell>
                                <Table.HeaderCell className="headcol2">
                                  Acciones
                                </Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>
                            <Table.Body>
                              {formalEducationData &&
                                formalEducationData.map((item:any, i:any) => {
                                  i++;
                                  return (
                                    <Table.Row key={i}>
                                      <Table.Cell className="headcol">
                                        <div className="display-flex">
                                          <span>{i}</span>
                                          <span>{item.qualification}</span>
                                        </div>
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.education_level_text}{" "}
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.educational_institution}{" "}
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.town_name}
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.graduate_status == 1
                                          ? "YES"
                                          : "NO"}
                                      </Table.Cell>
                                      <Table.Cell className="col--bdy-text">
                                        {item.date_graduation}
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
                                          onClick={() => {
                                            setEditEduOpen(true);
                                            setEditData(item);
                                          }}
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
                                {/* <Pagination onClick={(e) => pageChange(e)} defaultActivePage={actyivePage} totalPages={50} /> */}

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
                              onClick={() => props.goBack(2)}
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <Grid className="form--buton-box mt-1">
                              <Button
                                onClick={() =>
                                  isEdit
                                    ? props.onPressEdit(10, false)
                                    : formalEducationData.length > 0
                                      ? props.setShowPage(4)
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

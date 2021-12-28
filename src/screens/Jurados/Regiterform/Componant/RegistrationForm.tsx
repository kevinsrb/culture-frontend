import React, { useContext, useEffect, useRef, useState } from "react";

import {
  Container,
  Form,
  Image,
  Header,
  Input,
  Button,
  Grid,
  Segment,
  Divider,
} from "semantic-ui-react";
import loginimage from "../../../../assets/login.png";
import ApiEndPoint from "../../../../utils/apiEndPoints";
import {
  apiCall,
  errorToast,
  successToast,
} from "../../../../utils/httpClient";
import DatePicker from "react-date-picker";
import moment from "moment";
import AddressSelectModel from "../../../Popupmodel/AddressSelectModel";
import Loader from "../../../../components/loader";
import Sidebar from "../../../../components/NavBar";
import HeaderMenu from "../../../../components/Header";

export default function RegistrationForm(props: any) {
  const [selectDatePk, setSelectDatePk] = useState<any>(new Date());
  // const dispatch  = useDispatch();
  const [viewAddressModel, setViewAddressModel] = useState<any>(false);
  const photoClickBtn = useRef(null);
  const [masterData, setMasterData] = React.useState<any>();
  const [sidebarShow, setSidebarShow] = useState<any>(false);
  const [formData, setFormData] = React.useState<any>({
    identification_no: "",
    first_name: "",
    middle_name: "",
    first_surname: "",
    second_surname: "",
    sexual_orientation: "",
    gender: "",
    country: "",
    department: "",
    mobile: "",
    neighborhood_residence: "",
    address: "",
    email: "",
    city: "",
    sworn: "",
    neighborhood: "",
    jury: "",
    landline_phone: "",
    birth_date: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState<any>(false);

  const [valueda, setvalueda] = useState<any>(null);
  const [openPage, setOpenPage] = useState<any>(false);

  const [openDropdown, setOpenDropdown] = useState<any>("");
  const [selectPhoto, setSelectPhoto] = useState<any>(null);
  const [identiSelectFile, setIdentiSelectFile] = useState<any>(null);
  const [identityDocumentFil, setIdentityDocumentFil] = useState<any>(null);

  const [formErrors, setFormErrors] = useState<any>();
  const [identificationCC, setIdentificationCC] = useState<any>("C.C.");
  const [placeGender, setPlaceGender] = useState<any>("");
  const [sexualOrientation, setSexualOrientation] = useState<any>("");
  const [genderIdentity, setGenderIdentity] = useState<any>("");
  const [placeCountry, setPlaceCountry] = useState<any>("");
  const [placeTown, setPlaceTown] = useState<any>("");
  const [placeDepartment, setPlaceDepartment] = useState<any>("");
  const [placeResidence, setPlaceResidence] = useState<any>("");
  const [selectYear, setSelectYear] = useState<any>("");
  const [selectMonth, setSelectMonth] = useState<any>("");
  const [selectDate, setSelectDate] = useState<any>("");
  const [addreeValue, setAddreeValue] = useState<any>("");
  const [addreeValueData, setAddreeValueData] = useState<any>("");
  const [resumeData, setResumeData] = useState<any>({});

  const { isEdit } = props;
  useEffect(() => {
    isEdit && getRegistrationData();
  }, []);

  async function handelDropdown(type: string) {
    const valDro = openDropdown == type ? "" : openDropdown != type ? type : "";
    setOpenDropdown(valDro);
  }

  async function handleSelectChange(item_name: any, item: any) {
    setOpenDropdown("");
  }
  const departmentData = [
    {
      department_id: 1,
      department_name: "Department",
    },
    {
      department_id: 2,
      department_name: "Department 1",
    },
    {
      department_id: 3,
      department_name: "Department 2",
    },
  ];
  const neigh_residence = [
    {
      residence_id: 1,
      residence_name: "Residence ",
    },
    {
      residence_id: 2,
      residence_name: "residence 1",
    },
    {
      residence_id: 3,
      residence_name: "Residence 2",
    },
  ];

  async function getRegistrationData() {
    const resData: any = await localStorage.getItem("resumeData");
    const val = JSON.parse(resData);
    const params = {
      resume_id: val?.resume_id,
    };
    setResumeData(val);
    setIsLoading(true);
    const { data } = await apiCall(
      "POST",
      ApiEndPoint.GETRESUMEDETAILS,
      params
    );

    if (data.status == 200) {
      setIsLoading(false);
      setFormData({
        ...formData,
        ...data.data,
      });
      setAddreeValue(data.data?.address);
      setAddreeValueData(data.data?.addree_value_data);
    } else {
      setIsLoading(false);
    }
  }

  function formValidation() {
    let formErrors: any = {};
    let formIsValid = true;
    const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!isEdit) {
      if (!identiSelectFile) {
        formIsValid = false;
        formErrors["document"] = true; //"Adjuntar documento de identidad is required !";
      }
    }
    if (!formData.identification_cc) {
      formIsValid = false;
      formErrors["identification_cc"] = true; //"C.C. is required !";
    }
    if (!formData.identification_no) {
      formIsValid = false;
      formErrors["identification_no"] = true; //"No. is required !";
    }
    if (!formData.first_name) {
      formIsValid = false;
      formErrors["first_name"] = true; //"Primer nombre is required !";
    }
    if (!formData.gender) {
      formIsValid = false;
      formErrors["gender"] = true; //"Sexo is required !";
    }
    if (!formData.email || emailValid.test(formData.email) === false) {
      formIsValid = false;
      formErrors["email"] = true; //"Correo electrónico is required !";
    }
    if (!formData.mobile) {
      formIsValid = false;
      formErrors["mobile"] = true; //"Celular is required !";
    }

    if (!addreeValue) {
      formIsValid = false;
      formErrors["address"] = true; //"Dirección is required !";
    }
    /*     if (!formData.address) {
      formIsValid = false;
      formErrors["address"] = "Dirección is required !";
    } */
    if (!formData.city) {
      formIsValid = false;
      formErrors["city"] = true; //"Ciudad is required !";
    }
    if (!formData.department) {
      formIsValid = false;
      formErrors["department"] = true; //"Departamento is required !";
    }
    if (!formData.country) {
      formIsValid = false;
      formErrors["country"] = true; //"País is required !";
    }
    if (!formData.second_surname) {
      formIsValid = false;
      formErrors["second_surname"] = true; //"Segundo apellido is required !";
    }
    if (!formData.first_surname) {
      formIsValid = false;
      formErrors["first_surname"] = true; //"Primer apellido is required !";
    }
    if (!formData.middle_name) {
      formIsValid = false;
      formErrors["middle_name"] = true; //"Segundo nombre is required !";
    }
    if (!formData.description) {
      formIsValid = false;
      formErrors["description"] = true; //"Perfil is required !";
    }
    if (!selectDatePk) {
      formIsValid = false;
      formErrors["birth_date"] = true; //"Middle name is required !";
    }

    setFormErrors(formErrors);
    return formIsValid;
  }
  async function swornResumeCreate() {
    if (formValidation()) {
      setIsLoading(true);
      let formdataSave = new FormData();
      isEdit && formdataSave.append("resume_id", resumeData.resume_id);
      formdataSave.append("identification_cc", formData.identification_cc);
      formdataSave.append("identification_no", formData.identification_no);
      formdataSave.append("first_name", formData.first_name);
      formdataSave.append("middle_name", formData.middle_name);
      formdataSave.append("first_surname", formData.first_surname);
      formdataSave.append("second_surname", formData.second_surname);
      formdataSave.append("sexual_orientation", formData.sexual_orientation);
      formdataSave.append("gender_identity", formData.gender_identity);
      formdataSave.append("gender", formData.gender);
      formdataSave.append("country", formData.country);
      formdataSave.append("department", formData.department);
      formdataSave.append("mobile", formData.mobile);
      formdataSave.append(
        "neighborhood_residence",
        formData.neighborhood_residence
      );
      formdataSave.append("address", addreeValue);
      formdataSave.append("addree_value_data", addreeValueData);
      formdataSave.append("email", formData.email);
      formdataSave.append("city", formData.city);
      formdataSave.append("sworn", formData.sworn);
      formdataSave.append("neighborhood", formData.neighborhood);
      formdataSave.append("jury", formData.jury);
      formdataSave.append("landline_phone", formData.landline_phone);
      formdataSave.append("description", formData.description);
      formdataSave.append(
        "birth_date",
        moment(selectDatePk).format("DD-MM-YYYY")
      );
      formdataSave.append("photo", selectPhoto);
      formdataSave.append("identity_document", identiSelectFile);
      const header = { "Content-Type": "multipart/form-data" };

      const { data } = await apiCall(
        "POST",
        isEdit ? ApiEndPoint.RESUMEDATAUPDATE : ApiEndPoint.RESUMEDATACREATE,
        formdataSave,
        header
      );

      if (data.status == 200 && isEdit) {
        setIsLoading(false);
        props.onPressEdit(10, false);
        successToast(data.message);
        // window.location.reload();
      } else if (data.status == 200) {
        await localStorage.setItem("resumeData", JSON.stringify(data.data));
        setIsLoading(false);
        props.setShowPage(2);
        props.setResumeData(data.data);
        successToast(data.message);
        // window.location.reload();
      } else {
        setIsLoading(false);
        errorToast(data.message);
      }
    }
  }

  async function handelClickPhotoImg() {
    // photoClickBtn.current?.click()

    // @ts-ignore
    document.getElementById("photoSelect").click();
  }
  async function handelClickPhotoImgIdnt() {

    // @ts-ignore
    document.getElementById("fileSelect").click();
  }
  async function clickidentityDocumentBtn() {
    // photoClickBtn.current?.click()

    // @ts-ignore
    document.getElementById("identityDocumentFile").click();
  }

  // @ts-ignore
  const onFilechange = (event) => {
    console.log("event: ", event.target);
    setSelectPhoto(event.target.files[0]);
  };

  // @ts-ignore
  const onFilechangeFile = (event) => {
    setIdentiSelectFile(event.target.files[0]);
  };

  // @ts-ignore
  const onDocumentFile = (event) => {
    setIdentityDocumentFil(event.target.files[0]);
  };
  // @ts-ignore
  const masterFilter = (type) =>
    (props.masterData &&
      props.masterData.filter((item: any) => item.type == type)) ||
    [];

  return (
    <div>
      {isLoading && <Loader />}

      <Container fluid>
        <AddressSelectModel
          viewAddressModel={viewAddressModel}
          setViewAddressModel={setViewAddressModel}
          setAddreeValueData={setAddreeValueData}
          addreeValueData={addreeValueData}
          setAddreeValue={setAddreeValue}
        />
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column className="form--left-box mob_sidebar" id={`${sidebarShow ? 'show__sidebar' : 'hide__sidebar'}`}>
              <Sidebar setSidebarShow={setSidebarShow} sidebarShow={sidebarShow} />
            </Grid.Column>
            <Grid.Column className="form--right-box" >
              <HeaderMenu setSidebarShow={setSidebarShow} sidebarShow={sidebarShow} />
              <Grid style={{ height: "100vh", width: "100%", margin: 0 }}>
                <Grid.Column style={{ maxWidth: "99%" }}>
                  <Form size="large">
                    <Segment>
                      <Header
                        as="h4"
                        className="jura--form-heading"
                        floated="left"
                      >
                        Hoja De Vida Jurado -{" "}
                        <small>Todos los campos son obligatorios</small>
                      </Header>
                      <Divider clearing />
                      <Grid columns={2}>
                        <Grid.Row>
                          <Grid.Column className="jura--rg-detl">
                            <Image
                              className="jura---usr-img"
                              src={
                                selectPhoto
                                  ? URL.createObjectURL(selectPhoto)
                                  : "usr.png"
                              }
                              style={{ height: 65, width: 66 }}
                            />
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
                                style={{ borderColor: "red", borderWidth: 0.8 }}
                              >
                                <Input
                                  label={{ basic: true, content: "Adjuntar" }}
                                  labelPosition="right"
                                  placeholder={selectPhoto?.name}
                                  className="usr--img-input"
                                />
                              </div>
                            </Form>
                          </Grid.Column>
                          <Grid.Column>
                            <Form className="form--dec-input">
                              <Input
                                type="file"
                                id="fileSelect"
                                onChange={(e) => onFilechangeFile(e)}
                                style={{ display: "none" }}
                              />
                              <label
                                className={`${!identiSelectFile?.name &&
                                  formErrors?.document &&
                                  "activeLabel"
                                  }`}
                              >
                                Adjuntar documento de identidad
                              </label>
                              <div
                                onClick={() => handelClickPhotoImgIdnt()}
                                className="curser-pointer"
                              >
                                <Input
                                  label={{ basic: true, content: "Adjuntar" }}
                                  labelPosition="right"
                                  placeholder={
                                    identiSelectFile?.name
                                      ? identiSelectFile?.name
                                      : formData?.identity_document
                                        ? formData?.identity_document
                                        : ""
                                  }
                                  value={identiSelectFile?.name}
                                  className={`usr--img-input ${!identiSelectFile?.name &&
                                    formErrors?.document &&
                                    "activeBorder"
                                    }`}
                                  style={{ width: "82%" }}
                                />
                              </div>
                            </Form>
                            {formErrors && formErrors.document && (
                              <small className="text-red">
                                {!identiSelectFile?.name && formErrors.document}
                              </small>
                            )}
                            {/* <Form className="form--dec-input">
                        <Input
                          type="file"
                          id="identityDocumentFile"
                          onClick={(e) => onDocumentFile(e)}
                          style={{ display: "none" }}
                        />
                        <label>Adjuntar documento de identidad</label>
                        <Input
                          label={{ basic: true, content: "Adjuntar" }}
                          labelPosition="right"
                          placeholder=""
                          className="usr--img-input"
                          onClick={() => clickidentityDocumentBtn()}
                          error={(!identityDocumentFil)&&formErrors?.identityDocument}
                        />
                      </Form> */}
                            {/* {formErrors && formErrors.identityDocument && (
                          <small className="text-red">
                            {(!identityDocument)&&formErrors.identityDocument}
                          </small>
                        )} */}
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                      <Grid columns={1}>
                        <Grid.Row>
                          <Grid.Column>
                            <label>Perfil</label>
                            <Form.TextArea
                              placeholder=""
                              rows={4}
                              rowsMax={4}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  description: e.target.value,
                                })
                              }
                              value={formData?.description}
                              error={
                                !formData.description && formErrors?.description
                              }
                            />
                            {/* {formErrors && formErrors.description && (
                          <small className="text-red">
                            {(!formData.description) && formErrors.description}
                          </small>
                        )} */}
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                      <Grid columns={4}>
                        <Grid.Row>
                          <Grid.Column className='rgFrm_identi'>
                            <label>Documento de identidad</label>
                            <Form.Group>
                              <Form.Select
                                options={masterData}
                                placeholder={
                                  formData?.cc_name
                                    ? formData?.cc_name
                                    : identificationCC
                                }
                                // width={6}
                                fluid
                                type="text"
                                onClick={() =>
                                  handelDropdown("identification_cc")
                                }
                                className="select--val rgFotm_cc"
                                error={
                                  !formData.identification_cc &&
                                  formErrors?.identification_cc
                                }
                              />
                              {openDropdown &&
                                openDropdown == "identification_cc" ? (
                                <Grid
                                  columns={1}
                                  className="select__box"
                                  style={{ margin: "39px 6px" }}
                                >
                                  <Grid.Row>
                                    <Grid.Column className="select__box_clm">
                                      <Grid>
                                        {masterFilter("cc").map((item: any, i: any) => {
                                          return (
                                            <p
                                              key={i}
                                              className="select__value form-slct"
                                            >
                                              <p
                                                onClick={() => (
                                                  setFormData({
                                                    ...formData,
                                                    identification_cc: item.id,
                                                  }),
                                                  handleSelectChange("identification_cc",
                                                    item
                                                  ),
                                                  setIdentificationCC(item.text)
                                                )}
                                                className="form-slct_text"
                                              >
                                                {item.text}
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
                              <Form.Input
                                type="number"
                                placeholder="No."
                                // width={10}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    identification_no: e.target.value,
                                  })
                                }
                                value={formData?.identification_no}
                                error={
                                  !formData.identification_no &&
                                  formErrors?.identification_no
                                }
                                className='rgFotm_no'
                              />
                            </Form.Group>
                            <Grid></Grid>
                          </Grid.Column>
                          <Grid.Column>
                            <label>Fecha de nacimiento</label>
                            <DatePicker
                              onChange={setSelectDatePk}
                              value={selectDatePk}
                              className="date_pkr"
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <Form.Input
                              className="mb-0"
                              label="Primer nombre"
                              name=""
                              type="text"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  first_name: e.target.value,
                                })
                              }
                              value={formData?.first_name}
                              error={
                                !formData.first_name && formErrors?.first_name
                              }
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <Form.Input
                              className="mb-0"
                              label="Segundo nombre"
                              name=""
                              type="text"
                              value={formData?.middle_name}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  middle_name: e.target.value,
                                })
                              }
                              error={
                                !formData.middle_name && formErrors?.middle_name
                              }
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>

                      <Grid columns={4}>
                        <Grid.Row>
                          <Grid.Column>
                            <Form.Input
                              className="mb-0"
                              label="Primer apellido"
                              name=""
                              type="text"
                              value={formData?.first_surname}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  first_surname: e.target.value,
                                })
                              }
                              error={
                                !formData.first_surname &&
                                formErrors?.first_surname
                              }
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <Form.Input
                              className="mb-0"
                              label="Segundo apellido"
                              name=""
                              type="text"
                              value={formData?.second_surname}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  second_surname: e.target.value,
                                })
                              }
                              error={
                                !formData.second_surname &&
                                formErrors?.second_surname
                              }
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <Form.Field className="mb-0">
                              {//@ts-ignore
                                <Form.Select
                                  label="Sexo"
                                  placeholder={
                                    formData?.gender_name
                                      ? formData?.gender_name
                                      : placeGender
                                  }
                                  onClick={() => handelDropdown("gender")}
                                  className="select--val"
                                  error={!formData.gender && formErrors?.gender}
                                />
                              }
                              {openDropdown && openDropdown == "gender" ? (
                                <Grid columns={1} className="select__box">
                                  <Grid.Row>
                                    <Grid.Column className="select__box_clm">
                                      <Grid>
                                        {masterFilter("gender").map(
                                          (item: any, i: any) => {
                                            return (
                                              <p
                                                key={i}
                                                className="select__value"
                                              >
                                                <p
                                                  onClick={() => (
                                                    setFormData({
                                                      ...formData,
                                                      gender: item.id,
                                                    }),
                                                    handleSelectChange(
                                                      "gender",
                                                      item
                                                    ),
                                                    setPlaceGender(item.text)
                                                  )}
                                                  className="form-slct_text"
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
                            {/* {formErrors && formErrors.gender && (
                        <small className="text-red">{(!formData.gender) && formErrors.gender}</small>
                      )} */}
                          </Grid.Column>

                          <Grid.Column>
                            <Form.Field className="mb-0">
                              <label>
                                Orientación sexual -{" "}
                                <small className="text-gray">Opcional</small>
                              </label>
                              {//@ts-ignore
                                <Form.Select
                                  placeholder={
                                    formData?.sexual_orientation_name
                                      ? formData?.sexual_orientation_name
                                      : sexualOrientation
                                  }
                                  onClick={() =>
                                    handelDropdown("sexual_orientation")
                                  }
                                  className="select--val"
                                />
                              }
                              {openDropdown &&
                                openDropdown == "sexual_orientation" ? (
                                <Grid columns={1} className="select__box">
                                  <Grid.Row>
                                    <Grid.Column className="select__box_clm">
                                      <Grid>
                                        {masterFilter("sexual_orientation").map(
                                          (item: any, i: any) => {
                                            return (
                                              <p
                                                key={i}
                                                className="select__value"
                                              >
                                                <p
                                                  onClick={() => (
                                                    setFormData({
                                                      ...formData,
                                                      sexual_orientation:
                                                        item.id,
                                                    }),
                                                    handleSelectChange(
                                                      "sexual_orientation",
                                                      item
                                                    ),
                                                    setSexualOrientation(
                                                      item.text
                                                    )
                                                  )}
                                                  className="form-slct_text"
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
                        </Grid.Row>
                      </Grid>

                      <Grid columns={4}>
                        <Grid.Row>
                          <Grid.Column>
                            <label>
                              Identidad de género -{" "}
                              <small className="text-gray">Opcional</small>
                            </label>
                            <Form.Field>
                              {//@ts-ignore
                                <Form.Select
                                  placeholder={
                                    formData?.gender_identity_name
                                      ? formData?.gender_identity_name
                                      : genderIdentity
                                  }
                                  onClick={() =>
                                    handelDropdown("gender_identity")
                                  }
                                  className="select--val"
                                />
                              }
                              {openDropdown &&
                                openDropdown == "gender_identity" ? (
                                <Grid columns={1} className="select__box">
                                  <Grid.Row>
                                    <Grid.Column className="select__box_clm">
                                      <Grid>
                                        {masterFilter("gender_identity").map(
                                          (item: any, i: any) => {
                                            return (
                                              <p
                                                key={i}
                                                className="select__value"
                                              >
                                                <p
                                                  onClick={() => (
                                                    handleSelectChange(
                                                      "gender_identity",
                                                      item
                                                    ),
                                                    setGenderIdentity(
                                                      item.text
                                                    ),
                                                    setFormData({
                                                      ...formData,
                                                      gender_identity: item.id,
                                                    })
                                                  )}
                                                  className="form-slct_text"
                                                >
                                                  {item.text}
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
                            <Form.Field className="mb-0">
                              {//@ts-ignore
                                <Form.Select
                                  label="País"
                                  placeholder={
                                    formData?.country_name
                                      ? formData?.country_name
                                      : placeCountry
                                  }
                                  onClick={() => handelDropdown("country")}
                                  className="select--val"
                                  error={!formData.country && formErrors?.country}
                                />
                              }
                              {openDropdown && openDropdown == "country" ? (
                                <Grid columns={1} className="select__box">
                                  <Grid.Row>
                                    <Grid.Column className="select__box_clm">
                                      <Grid>
                                        {props.countriesData &&
                                          props.countriesData.map((item: any, i: any) => {
                                            return (
                                              <p
                                                key={i}
                                                className="select__value"
                                              >
                                                <p
                                                  onClick={() => (
                                                    setFormData({
                                                      ...formData,
                                                      country: item.country_id,
                                                    }),
                                                    setPlaceCountry(
                                                      item.country_name
                                                    ),
                                                    handleSelectChange(
                                                      "country",
                                                      item
                                                    )
                                                  )}
                                                  className="form-slct_text"
                                                >
                                                  {item.country_name}
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
                          <Grid.Column>
                            <Form.Field className="mb-0">
                              {//@ts-ignore

                                <Form.Select
                                  label="Departamento"
                                  placeholder={
                                    formData?.department_name
                                      ? formData?.department_name
                                      : placeDepartment
                                  }
                                  onClick={() => handelDropdown("department")}
                                  className="select--val"
                                  error={
                                    !formData.department && formErrors?.department
                                  }
                                />
                              }
                              {openDropdown && openDropdown == "department" ? (
                                <Grid columns={1} className="select__box">
                                  <Grid.Row>
                                    <Grid.Column className="select__box_clm">
                                      <Grid>
                                        {departmentData.map((item, i) => {
                                          return (
                                            <p
                                              key={i}
                                              className="select__value"
                                            >
                                              <p
                                                onClick={() => (
                                                  handleSelectChange(
                                                    "department",
                                                    item
                                                  ),
                                                  setFormData({
                                                    ...formData,
                                                    department:
                                                      item.department_id,
                                                  }),
                                                  setPlaceDepartment(
                                                    item.department_name
                                                  )
                                                )}
                                              >
                                                {item.department_name}
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
                            {/*  {formErrors && formErrors.department && (
                        <small className="text-red">
                          {(!formData.department) && formErrors.department}
                        </small>
                      )} */}
                          </Grid.Column>
                          <Grid.Column>
                            <Form.Field className="mb-0">
                              {//@ts-ignore
                                <Form.Select
                                  label="Ciudad"
                                  placeholder={
                                    formData?.town_name
                                      ? formData?.town_name
                                      : placeTown
                                  }
                                  onClick={() => handelDropdown("town")}
                                  className="select--val"
                                  error={!formData.city && formErrors?.city}
                                />
                              }
                              {openDropdown && openDropdown == "town" ? (
                                <Grid columns={1} className="select__box">
                                  <Grid.Row>
                                    <Grid.Column className="select__box_clm">
                                      <Grid>
                                        {props.citiesData &&
                                          props.citiesData.map((item: any, i: any) => {
                                            return (
                                              <p
                                                key={i}
                                                className="select__value"
                                              >
                                                <p
                                                  onClick={() => (
                                                    handleSelectChange(
                                                      "town",
                                                      item
                                                    ),
                                                    setFormData({
                                                      ...formData,
                                                      city: item.city_id,
                                                    }),
                                                    setPlaceTown(item.city_name)
                                                  )}
                                                  className="form-slct_text"
                                                >
                                                  {item.city_name}
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
                            {/*  {formErrors && formErrors.city && (
                        <small className="text-red">{(!formData.city) &&  formErrors.city}</small>
                      )} */}
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                      <Grid columns={4}>
                        <Grid.Row>
                          <Grid.Column>
                            <label>
                              Barrio de residencia -{" "}
                              <small className="text-gray">Opcional</small>
                            </label>
                            <Form.Field>
                              {//@ts-ignore
                                <Form.Select
                                  placeholder={
                                    formData?.neighborhood_residence_name
                                      ? formData?.neighborhood_residence_name
                                      : placeResidence
                                  }
                                  onClick={() =>
                                    handelDropdown("neigh_residence")
                                  }
                                  className="select--val mb-0"
                                />
                              }
                              {openDropdown &&
                                openDropdown == "neigh_residence" ? (
                                <Grid columns={1} className="select__box">
                                  <Grid.Row>
                                    <Grid.Column className="select__box_clm">
                                      <Grid>
                                        {neigh_residence.map((item, i) => {
                                          return (
                                            <p
                                              key={i}
                                              className="select__value"
                                            >
                                              <p
                                                onClick={() => (
                                                  handleSelectChange(
                                                    "town",
                                                    item
                                                  ),
                                                  setPlaceResidence(
                                                    item.residence_name
                                                  ),
                                                  setFormData({
                                                    ...formData,
                                                    neighborhood_residence:
                                                      item.residence_id,
                                                  })
                                                )}
                                                className="form-slct_text"
                                              >
                                                {item.residence_name}
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
                          <Grid.Column>
                            <Form.Input
                              className="mb-0"
                              label="Dirección"
                              // name="numero_documento"
                              // type="text"
                              /* onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  address: e.target.value,
                                })
                              } */

                              value={
                                formData?.address
                                  ? formData?.address
                                  : addreeValue
                              }
                              onClick={() => setViewAddressModel(true)}
                              error={!addreeValue && formErrors?.address}
                            />
                            {/* {formErrors && formErrors.address && (
                        <small className="text-red">{(!formData.address) && formErrors.address}</small>
                      )} */}
                          </Grid.Column>
                          <Grid.Column>
                            <Form.Input
                              className="mb-0"
                              label="Correo electrónico"
                              name="numero_documento"
                              type="email"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }
                              value={formData?.email}
                              error={!formData.email && formErrors?.email}
                            />
                            {/* {formErrors && formErrors.email && (
                        <small className="text-red">{(!formData.email) && formErrors.email}</small>
                      )} */}
                          </Grid.Column>
                          <Grid.Column>
                            <Form.Input
                              className="mb-0"
                              type="number"
                              fluid
                              label="Celular"
                              name="numero_documento"
                              value={formData.mobile}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  mobile: e.target.value,
                                })
                              }
                              error={!formData.mobile && formErrors?.mobile}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                      <Grid columns={4}>
                        <Grid.Row>
                          <Grid.Column>
                            <label>
                              Teléfono fijo -{" "}
                              <small className="text-gray">Opcional</small>
                            </label>
                            <Form.Input
                              fluidclassName="mb-0"
                              name="numero_documento"
                              type="number"
                              value={formData?.landline_phone}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  landline_phone: e.target.value,
                                })
                              }
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>

                      <Divider clearing />
                      <Grid columns={1}>
                        <Grid.Row>
                          <Grid.Column>
                            <Grid className="form--buton-box mt-1">
                              <Button
                                onClick={() => swornResumeCreate()}
                                content="Guardar y Continuar"
                                className="btn btn-primary"
                              />
                              {/* <Button onClick={() => props.setShowPage(2)} content="Guardar y Continuar" className="btn btn-primary" id='clickNewPage' style={{display:'none'}} /> */}
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

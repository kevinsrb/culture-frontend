import React, { useEffect, useState } from "react";
import {
  Header,
  Container,
  Form,
  Input,
  Button,
  Grid,
  Segment,
  Divider,
  Radio,
  Modal,
} from "semantic-ui-react";
import DatePicker from "react-date-picker";
import moment from "moment";
import ApiEndPoint from "../../utils/apiEndPoints";
import { apiCall, successToast, errorToast } from "../../utils/httpClient";
export default function EditAgregarFormEducationModel(props: any) {
  const {
    editData,
    masterData,
    setEditData,
    getNonFormalEducationData,
    setIsLoading,
  } = props;
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());
  const [openDropdown, setOpenDropdown] = useState<any>("");
  const [guy, setGuy] = useState<any>("");
  const [modality, setModality] = useState<any>("");
  const [town, setTown] = useState<any>("");
  const [selectPhoto, setSelectPhoto] = useState<any>(null);
  const [formErrors, setFormErrors] = useState<any>({});

  useEffect(() => {
    // editData?.start_date &&
    editData?.start_date &&
      setStartDate(
        new Date(moment(editData.start_date, "DD-MM-YYYY").format())
      );
    editData?.finish_date &&
      setEndDate(new Date(moment(editData.finish_date, "DD-MM-YYYY").format()));
  }, [editData]);

  async function handelDropdown(type: any) {
    const valDro = openDropdown == type ? "" : openDropdown != type ? type : "";
    setOpenDropdown(valDro);
  }

  async function handleSelectChange(type: any, item: any) {
    if (type == "guy") {
      setEditData({
        ...editData,
        guy: item.id,
      });
    }
    if (type == "modality") {
      setEditData({
        ...editData,
        modality: item.id,
      });
    }
    if (type == "town") {
      setEditData({
        ...editData,
        town: item.city_id,
      });
    }

    setOpenDropdown("");
  }

  const masterFilter = (type: any) =>
    (masterData && masterData.filter((item: any) => item.type == type)) || [];

  async function handelClickPhotoImg() {
    //@ts-ignore
    document.getElementById("photoSelectedit").click();
  }
  const onFilechange = (event: any) => {
    console.log("event.target.files[0]: ", event.target.files[0].name);
    setSelectPhoto(event.target.files[0]);
  };
  function formValidation() {
    let formErrors: any = {};
    let formIsValid = true;

    if (!editData.guy) {
      formIsValid = false;
      formErrors["guy"] = true;
    }

    if (!editData.modality) {
      formIsValid = false;
      formErrors["modality"] = true;
    }

    if (!editData.name) {
      formIsValid = false;
      formErrors["name"] = true;
    }
    if (!editData.hours) {
      formIsValid = false;
      formErrors["hours"] = true;
    }
    if (!editData.town) {
      formIsValid = false;
      formErrors["town"] = true;
    }

    setFormErrors(formErrors);
    return formIsValid;
  }
  async function submitEditForm() {
    if (formValidation()) {
      let formdataSave = new FormData();
      setIsLoading(true);
      formdataSave.append(
        "non_formal_education_id",
        editData.non_formal_education_id
      );
      formdataSave.append("resume_id", editData.resume_id);
      formdataSave.append("guy", editData.guy);

      formdataSave.append("modality", editData.modality);
      formdataSave.append("name", editData.name);
      formdataSave.append("institution", editData.institution);
      formdataSave.append("start_date", moment(startDate).format("DD-MM-YYYY"));
      formdataSave.append("finish_date", moment(endDate).format("DD-MM-YYYY"));
      formdataSave.append("hours", editData.hours);
      formdataSave.append("town", editData.town);
      formdataSave.append("document", selectPhoto);
      const header = { "Content-Type": "multipart/form-data" };
      const { data } = await apiCall(
        "POST",
        ApiEndPoint.UPDATENONFORMALEDUCATION,
        formdataSave,
        header
      );
      if (data.status == 200) {
        setIsLoading(false);

        getNonFormalEducationData(0);
        successToast(data.message);
        props.setEditEduOpen(false);
        // window.location.reload();
      } else {
        errorToast(data.message);
        setIsLoading(false);
      }
    }
  }
  function cleanField() {
    setEditData({
      ...editData,
      guy: "",
      modality: "",
      name: "",
      institution: "",
      start_date: "",
      finish_date: "",
      hours: "",
      town: "",
      annexed_file: "",
      modality_text: "",
      guy_text: "",
      town_name: "",
    });
    setStartDate(new Date());
    setEndDate(new Date());
    setSelectPhoto({});
    setGuy("");
    setTown("");
    setModality("");
    return true;
  }
  return (
    <div>
      <Modal
        onClose={() => (
          props.setEditEduOpen(false), getNonFormalEducationData(0)
        )}
        onOpen={() => props.setEditEduOpen(true)}
        open={props.editEduOpen}
        className="model--div"
      >
        <Modal.Content className="model--containt">
          <Grid className="model--headr">
            <Grid.Column floated="left" width={10}>
              <Header as="h4" className="jura--form-heading" floated="left">
                {" "}
                Agregar Educación No Formal -{" "}
                <small>Todos los campos son obligatorios</small>
              </Header>
            </Grid.Column>
            <Grid.Column
              floated="right"
              className='text-right'
              width={5}
              style={{ textAlign: "right" }}
            >
              <p
                className="model--close-icon"
                onClick={() => (
                  props.setEditEduOpen(false), getNonFormalEducationData()
                )}
              >
                X{" "}
              </p>
            </Grid.Column>
          </Grid>

          <Grid style={{ width: "100%", margin: 0 }}>
            <Grid.Column style={{ maxWidth: "99%" }}>
              <Form size="large">
                <Grid columns={4}>
                  <Grid.Row>
                    <Grid.Column>
                      <label>Tipo</label>
                      {//@ts-ignore
                        <Form.Select
                          placeholder={guy == "" ? editData?.guy_text : guy}
                          onClick={() => handelDropdown("guy")}
                          fluid
                          name="numero_documento"
                          className="select--val"
                          type="text"
                          required={true}
                          error={!editData.guy && formErrors?.guy}
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
                                      className={`form-slct ${editData?.guy == item.id ? "active" : ""
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
                      {//@ts-ignore
                        <Form.Select
                          className="select--val"
                          placeholder={
                            modality == "" ? editData?.modality_text : modality
                          }
                          onClick={() => handelDropdown("modality")}
                          fluid
                          name="numero_documento"
                          type="text"
                          required={true}
                          error={!editData.modality && formErrors?.modality}
                        />
                      }
                      {openDropdown && openDropdown == "modality" ? (
                        <Grid columns={1} className="select__box">
                          <Grid.Row>
                            <Grid.Column className="select__box_clm">
                              <Grid>
                                {masterFilter("education").map((item: any, i: any) => {
                                  return (
                                    <p
                                      key={i}
                                      className={`form-slct ${editData?.modality == item.id
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
                              {formErrors && formErrors.name && (
                                <small className="text-red">
                                  {formErrors.name}
                                </small>
                              )}
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
                        value={editData?.name}
                        name="numero_documento"
                        type="text"
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            name: e.target.value,
                          })
                        }
                        required={true}
                        error={!editData.name && formErrors?.name}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <label>
                        Institución - <small>Opcional</small>
                      </label>
                      <Form.Input
                        fluid
                        value={editData?.institution}
                        placeholder=""
                        name="numero_documento"
                        type="text"
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            institution: e.target.value,
                          })
                        }
                      // error={!editData.institution && formErrors?.institution}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Grid columns={4}>
                        <Grid.Row>
                          <Grid.Column>
                            <label>Fecha de inicio</label>
                            <DatePicker
                              onChange={setStartDate}
                              value={startDate}
                              className="date_pkr date_pkr_edit"
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <label>Fecha de terminación</label>
                            <DatePicker
                              onChange={setEndDate}
                              value={endDate}
                              className="date_pkr date_pkr_edit"
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <label>Número de horas</label>
                            <Form.Input
                              fluid
                              value={editData?.hours}
                              placeholder=""
                              name="numero_documento"
                              type="text"
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  hours: e.target.value,
                                })
                              }
                              required={true}
                              error={!editData.hours && formErrors?.hours}
                            />
                          </Grid.Column>
                          <Grid.Column
                            style={{ marginRight: 2, marginTop: 17 }}
                          >
                            <label>Ciudad</label>
                            {//@ts-ignore
                              <Form.Select
                                className="select--val"
                                placeholder={
                                  town == "" ? editData?.town_name : town
                                }
                                onClick={() => handelDropdown("town")}
                                required={true}
                                error={!editData.town && formErrors?.town}
                              />
                            }
                            {openDropdown && openDropdown == "town" ? (
                              <Grid columns={1} className="select__box">
                                <Grid.Row>
                                  <Grid.Column className="select__box_clm">
                                    <Grid>
                                      {props?.citiesData.map((item:any, i:any) => {
                                        return (
                                          <p
                                            key={i}
                                            className={`form-slct ${editData?.town == item.city_id
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
                          id="photoSelectedit"
                          onChange={(e) => onFilechange(e)}
                          style={{ display: "none" }}
                        />
                        <div
                          className="curser-pointer"
                          onClick={() => handelClickPhotoImg()}
                        >
                          <Input
                            label={{ basic: true, content: "Adjuntar" }}
                            value={
                              selectPhoto?.name
                                ? selectPhoto?.name
                                : editData?.annexed_file
                            }
                            labelPosition="right"
                            placeholder=""
                            className="input--adj"
                            onClick={() => handelClickPhotoImg()}
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
                          onClick={submitEditForm}
                          content="Agregar"
                          className="btn btn-primary"
                        />
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form>
            </Grid.Column>
          </Grid>
        </Modal.Content>
      </Modal>
    </div>
  );
}

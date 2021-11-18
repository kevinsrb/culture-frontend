import React, { useState } from "react";
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
import ApiEndPoint from "../../utils/apiEndPoints";
import { apiCall, successToast, errorToast } from "../../utils/httpClient";
export default function EditAgregarPublicacionesModel(props) {
  const {
    editData,
    masterData,
    setEditData,
    getPublicationList,
    setIsLoading,
  } = props;
  const [guy, setGuy] = useState("");
  const [town, setTown] = useState("");
  const [format, setFormat] = useState("");
  const [selectPhoto, setSelectPhoto] = useState(null);
  const [openDropdown, setOpenDropdown] = useState("");
  const [formErrors, setFormErrors] = useState();

  const masterFilter = (type) =>
    (masterData && masterData.filter((item) => item.type == type)) || [];
  async function handelDropdown(type) {
    const valDro = openDropdown == type ? "" : openDropdown != type ? type : "";
    setOpenDropdown(valDro);
  }
  async function handleSelectChange(type, item) {
    if (type == "guy") {
      setEditData({
        ...editData,
        guy: item.id,
      });
    }
    if (type == "format") {
      setEditData({
        ...editData,
        format: item.id,
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

  async function handelClickPhotoImg() {
    document.getElementById("photoSelectEdit").click();
  }
  const onFilechange = (event) => {
    setSelectPhoto(event.target.files[0]);
  };
  function formValidation(item) {
    let formErrors = {};
    let formIsValid = true;
    if (!editData.title) {
      formIsValid = false;
      formErrors["title"] = true;
    }
    if (!editData.theme) {
      formIsValid = false;
      formErrors["theme"] = true;
    }
    if (!editData.guy) {
      formIsValid = false;
      formErrors["guy"] = true;
    }
    if (!editData.format) {
      formIsValid = false;
      formErrors["format"] = true;
    }
    if (!editData.town) {
      formIsValid = false;
      formErrors["town"] = true;
    }
    if (!editData.year) {
      formIsValid = false;
      formErrors["year"] = true;
    }
    setFormErrors(formErrors);
    return formIsValid;
  }

  async function submitEditForm() {
    if (formValidation()) {
      let formdataSave = new FormData();
      setIsLoading(true);
      formdataSave.append("publications_id", editData.publications_id);
      formdataSave.append("resume_id", editData.resume_id);
      formdataSave.append("title", editData.title);
      formdataSave.append("theme", editData.theme);
      formdataSave.append("guy", editData.guy);
      formdataSave.append("format", editData.format);
      formdataSave.append("town", editData.town);
      formdataSave.append("year", editData.year);
      formdataSave.append("document", selectPhoto);
      const header = { "Content-Type": "multipart/form-data" };
      const { data } = await apiCall(
        "POST",
        ApiEndPoint.UPDATEPUBLICATIONS,
        formdataSave,
        header
      );
      if (data.status == 200) {
        setIsLoading(false);
        getPublicationList();
        props.setEditEduOpen(false);
        successToast(data.message);
      } else {
        setIsLoading(false);
        errorToast(data.message);
      }
    }
  }
  function cleanField() {
    setEditData({
      ...editData,
      title: "",
      theme: "",
      guy: "",
      format: "",
      town: "",
      year: "",
      town_name: "",
      format_text: "",
      guy_text: "",
      document: "",
    });
    setSelectPhoto({});
    setGuy("");
    setTown("");
    setFormat("");
    return true;
  }
  return (
    <div>
      <Modal
        onClose={() => (props.setEditEduOpen(false), getPublicationList())}
        onOpen={() => props.setEditEduOpen(true)}
        open={props.editEduOpen}
        className="model--div"
      >
        <Modal.Content className="model--containt">
          <Grid className="model--headr">
            <Grid.Column floated="left" width={10}>
              <Header as="h4" className="jura--form-heading" floated="left">
                Publicaciones - <small>Todos los campos son obligatorios</small>
              </Header>
            </Grid.Column>
            <Grid.Column
              floated="right text-right"
              width={5}
              style={{ textAlign: "right" }}
            >
              <p
                className="model--close-icon"
                onClick={() => (
                  props.setEditEduOpen(false), getPublicationList(0)
                )}
              >
                X{" "}
              </p>
            </Grid.Column>
          </Grid>

          <Grid style={{ width: "100%", margin: 0 }}>
            <Grid.Column style={{ maxWidth: "99%" }}>
              <Form size="large">
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
                        value={editData?.title}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            title: e.target.value,
                          })
                        }
                        error={!editData.title && formErrors?.title}
                      />
                    </Grid.Column>

                    <Grid.Column>
                      <label>Tema</label>
                      <Form.Input
                        fluid
                        placeholder=""
                        name="numero_documento"
                        type="text"
                        value={editData?.theme}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            theme: e.target.value,
                          })
                        }
                        error={!editData.theme && formErrors?.theme}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Grid columns={4}>
                  <Grid.Row>
                    <Grid.Column>
                      <label>Tipo</label>
                      <Form.Select
                        fluid
                        className="select--val"
                        placeholder={guy == "" ? editData?.guy_text : guy}
                        onClick={() => handelDropdown("guy")}
                        error={!editData.guy && formErrors?.guy}
                      />
                      {openDropdown && openDropdown == "guy" ? (
                        <Grid columns={1} className="select__box">
                          <Grid.Row>
                            <Grid.Column className="select__box_clm">
                              <Grid>
                                {masterFilter("education").map((item, i) => {
                                  return (
                                    <p
                                      key={i}
                                      className={`form-slct ${
                                        editData?.guy == item.id ? "active" : ""
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
                      <Form.Select
                        error={!editData.format && formErrors?.format}
                        className="select--val"
                        placeholder={
                          format == "" ? editData?.format_text : format
                        }
                        onClick={() => handelDropdown("format")}
                      />

                      {openDropdown && openDropdown == "format" ? (
                        <Grid columns={1} className="select__box">
                          <Grid.Row>
                            <Grid.Column className="select__box_clm">
                              <Grid>
                                {masterFilter("education").map((item, i) => {
                                  return (
                                    <p
                                      key={i}
                                      className={`form-slct ${
                                        editData?.town == item.id
                                          ? "active"
                                          : ""
                                      }`}
                                    >
                                      <p
                                        className="form-slct_text"
                                        onClick={() => (
                                          setFormat(item.text),
                                          handleSelectChange("format", item)
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
                      <Form.Select
                        error={!editData.town && formErrors?.town}
                        className="select--val"
                        placeholder={town == "" ? editData?.town_name : town}
                        onClick={() => handelDropdown("town")}
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
                                      className={`form-slct ${
                                        editData?.town == item.city_id
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
                        error={!editData.year && formErrors?.year}
                        value={editData?.year}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            year: e.target.value,
                          })
                        }
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
                          id="photoSelectEdit"
                          onChange={(e) => onFilechange(e)}
                          style={{ display: "none" }}
                        />
                        <Input
                          label={{ basic: true, content: "Adjuntar" }}
                          required={true}
                          error={formErrors?.document}
                          labelPosition="right"
                          placeholder=""
                          className="input--adj"
                          value={
                            selectPhoto?.name
                              ? selectPhoto?.name
                              : editData?.document
                          }
                          onClick={() => handelClickPhotoImg()}
                          style={{width:'90%'}}
                        />
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

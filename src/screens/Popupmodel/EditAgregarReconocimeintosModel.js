import React, { useEffect, useState } from "react";
import {
  Header,
  Container,
  Form,
  Input,
  Button,
  Grid,
  Divider,
  Modal,
} from "semantic-ui-react";
import ApiEndPoint from "../../utils/apiEndPoints";
import {
  setDefaultHeader,
  apiCall,
  successToast,
  errorToast,
} from "../../utils/httpClient";

export default function EditAgregarReconocimeintosModel(props) {
  const {
    editData,
    setEditData,
    citiesData,
    setIsLoading,
    getAcknowledgmentsData,
  } = props;

  const [openDropdown, setOpenDropdown] = useState("");
  const [placeTown, setPlaceTown] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [identityDocument, setIdentityDocument] = useState(null);

  async function handelDropdown(type) {
    const valDro = openDropdown == type ? "" : openDropdown != type ? type : "";
    setOpenDropdown(valDro);
  }
  async function handleSelectChange(type, item) {
    if (type == "town") {
      setEditData({
        ...editData,
        town: item.city_id,
      });
    }
    setOpenDropdown("");
  }

  async function handelClickPhotoImg() {
    // photoClickBtn.current?.click()
    document.getElementById("photoSelectedit").click();
  }
  const onFilechange = (event) => {
    console.log("event: ", event.target);
    setIdentityDocument(event.target.files[0]);
  };
  function formValidation(item) {
    let formErrors = {};
    let formIsValid = true;

    if (!editData.name) {
      formIsValid = false;
      formErrors["name"] = true;
    }
    if (!editData.institution_grants) {
      formIsValid = false;
      formErrors["institution_grants"] = true;
    }
    if (!editData.year) {
      formIsValid = false;
      formErrors["year"] = true;
    }
    if (!editData.town) {
      formIsValid = false;
      formErrors["town"] = true;
    }
    setFormErrors(formErrors);
    return formIsValid;
  }
  async function formUpdateData() {
    if (formValidation()) {
      setIsLoading(true);
      let formdataSave = new FormData();
      formdataSave.append("knowledgment_id", editData.knowledgment_id);
      formdataSave.append("resume_id", editData.resume_id);
      formdataSave.append("name", editData.name);
      formdataSave.append("institution_grants", editData.institution_grants);
      formdataSave.append("town", editData.town);
      formdataSave.append("year", editData.year);
      formdataSave.append("document", identityDocument);
      const header = { "Content-Type": "multipart/form-data" };

      const { data } = await apiCall(
        "POST",
        ApiEndPoint.UPDATEACKNOWLEDGMENT,
        formdataSave,
        header
      );
      if (data.status == 200) {
        setIsLoading(false);
        props.getAcknowledgmentsData();
        props.setEditEduOpen(false);
        successToast(data.message);
        // window.location.reload();
      } else {
        setIsLoading(false);
        errorToast(data.message);
      }
    }
  }
  function clearField() {
    setEditData({
      ...editData,
      name: "",
      institution_grants: "",
      town: 0,
      year: "",
      document: "",
      town_name: "",
    });
    setPlaceTown("");
    setIdentityDocument({});
  }

  return (
    <div>
      <Modal
        onClose={() => (props.setEditEduOpen(false), getAcknowledgmentsData(0))}
        onOpen={() => props.setEditEduOpen(true)}
        open={props.editEduOpen}
        className="model--div"
      >
        <Modal.Content className="model--containt">
          <Grid className="model--headr">
            <Grid.Column floated="left" width={10}>
              <Header as="h4" className="jura--form-heading" floated="left">
                {" "}
                Reconocimientos -{" "}
                <small>Todos los campos son obligatorios</small>
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
                  props.setEditEduOpen(false), getAcknowledgmentsData()
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
                          setEditData({
                            ...editData,
                            name: e.target.value,
                          })
                        }
                        error={!editData.name && formErrors?.name}
                        value={editData.name}
                      />
                    </Grid.Column>

                    <Grid.Column>
                      <label>Institución que la Otorga</label>
                      <Form.Input
                        fluid
                        placeholder=""
                        name=""
                        type="text"
                        value={editData.institution_grants}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            institution_grants: e.target.value,
                          })
                        }
                        required={true}
                        error={
                          !editData.institution_grants &&
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
                        type="text"
                        value={editData.year}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            year: e.target.value,
                          })
                        }
                        required={true}
                        error={!editData.year && formErrors?.year}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form className="form--dec-input">
                        <label>Ciudad</label>
                        <Form.Field>
                          <Form.Select
                            placeholder={
                              placeTown ? placeTown : editData?.town_name
                            }
                            onClick={() => handelDropdown("town")}
                            className="select--val"
                            required={true}
                            error={!editData.town && formErrors?.town}
                          />
                          {openDropdown && openDropdown == "town" ? (
                            <Grid columns={1} className="select__box">
                              <Grid.Row>
                                <Grid.Column className="select__box_clm">
                                  <Grid>
                                    {citiesData &&
                                      citiesData.length &&
                                      citiesData.map((item, i) => {
                                        return (
                                          <p
                                            key={i}
                                            onClick={() => (
                                              handleSelectChange("town", item),
                                              setPlaceTown(item.city_name)
                                            )}
                                            className="form-slct"
                                          >
                                            <p
                                              className={`form-slct_text ${
                                                editData.town == item.city_id
                                                  ? "active"
                                                  : ""
                                              }`}
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
                        </Form.Field>
                      </Form>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form className="form--dec-input">
                        <label>Anexar documento</label>
                        <Form className="form--dec-input">
                          <Input
                            type="file"
                            id="photoSelectedit"
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
                              className="usr--img-input"
                              style={{width:'91%'}}
                              value={
                                identityDocument?.name
                                  ? identityDocument?.name
                                  : editData.document
                              }
                              // onClick={() => handelClickPhotoImg()}
                            />
                          </div>
                        </Form>
                      </Form>
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
                          onClick={() => formUpdateData()}
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

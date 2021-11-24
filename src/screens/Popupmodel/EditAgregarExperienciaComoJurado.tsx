import React, { useState } from "react";
import {
  Header,
  Form,
  Input,
  Button,
  Grid,
  Divider,
  Modal,
} from "semantic-ui-react";
import ApiEndPoint from "../../utils/apiEndPoints";
import { apiCall, errorToast, successToast } from "../../utils/httpClient";
export default function EditAgregarExperienciaComoJurado(props: any) {
  const { editData, masterData, setEditData, getJuryList, setIsLoading } =
    props;
  const masterFilter = (type: any) =>
    (masterData && masterData.filter((item: any) => item.type == type)) || [];
  const [openDropdown, setOpenDropdown] = useState<any>("");
  const [town, setTown] = useState<any>("");
  const [area, setArea] = useState<any>("");
  const [selectPhoto, setSelectPhoto] = useState<any>(null);
  const [formErrors, setFormErrors] = useState<any>();

  async function handelDropdown(type: any) {
    const valDro = openDropdown == type ? "" : openDropdown != type ? type : "";
    setOpenDropdown(valDro);
  }
  async function handleSelectChange(type: any, item: any) {
    if (type == "town") {
      setEditData({
        ...editData,
        town: item.city_id,
      });
    }
    if (type == "area") {
      setEditData({
        ...editData,
        area: item.id,
      });
    }

    setOpenDropdown("");
  }
  async function handelClickPhotoImg() {
    //@ts-ignore
    document.getElementById("photoSelectEdit").click();
  }
  const onFilechange = (event: any) => {
    setSelectPhoto(event.target.files[0]);
  };
  function formValidation() {
    let formErrors: any = {};
    let formIsValid = true;

    if (!editData.name) {
      formIsValid = false;
      formErrors["name"] = true;
    }
    if (!editData.entity) {
      formIsValid = false;
      formErrors["entity"] = true;
    }
    if (!editData.town) {
      formIsValid = false;
      formErrors["town"] = true;
    }
    if (!editData.year) {
      formIsValid = false;
      formErrors["year"] = true;
    }
    if (!editData.area) {
      formIsValid = false;
      formErrors["area"] = true;
    }
    setFormErrors(formErrors);
    return formIsValid;
  }
  async function submitEditForm() {
    if (formValidation()) {
      setIsLoading(true);
      let formdataSave = new FormData();
      formdataSave.append(
        "non_formal_education_id",
        editData.non_formal_education_id
      );
      formdataSave.append("resume_id", editData.resume_id);
      formdataSave.append("jury_experience_id", editData.jury_experience_id);
      formdataSave.append("name", editData.name);
      formdataSave.append("entity", editData.entity);
      formdataSave.append("town", editData.town);
      formdataSave.append("year", editData.year);
      formdataSave.append("area", editData.area);
      formdataSave.append("document", selectPhoto);
      const header = { "Content-Type": "multipart/form-data" };
      const { data } = await apiCall(
        "POST",
        ApiEndPoint.UPDATEJURYEXPERIENCE,
        formdataSave,
        header
      );
      if (data.status == 200) {
        getJuryList();
        props.setEditEduOpen(false);
        successToast(data.message);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        errorToast(data.message);
      }
    }
  }
  function cleanField() {
    setEditData({
      ...editData,
      name: "",
      entity: "",
      town: "",
      year: "",
      area: "",
      document: "",
      area_text: "",
      town_name: "",
    });
    setArea('');
    setTown('');
    setSelectPhoto({});
  }

  return (
    <div>
      <Modal
        onClose={() => (props.setEditEduOpen(false), getJuryList())}
        onOpen={() => props.setEditEduOpen(true)}
        open={props.editEduOpen}
        className="model--div"
      >
        <Modal.Content className="model--containt">
          <Grid className="model--headr">
            <Grid.Column floated="left" width={10}>
              <Header as="h4" className="jura--form-heading" floated="left">
                {" "}
                Experiencia Como Jurado -{" "}
                <small>Todos los campos son obligatorios</small>
              </Header>
            </Grid.Column>
            <Grid.Column
              floated="right"
              className="text-right"
              width={5}
              style={{ textAlign: "right" }}
            >
              <p
                className="model--close-icon"
                onClick={() => (props.setEditEduOpen(false), getJuryList(0))}
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
                      <label>Nombre de la convocatoria</label>
                      <Form.Input
                        fluid
                        placeholder=""
                        name="numero_documento"
                        type="text"
                        value={editData?.name}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            name: e.target.value,
                          })
                        }
                        error={formErrors?.name}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <label>Entidad</label>
                      <Form.Input
                        fluid
                        placeholder=""
                        name="numero_documento"
                        type="text"
                        value={editData?.entity}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            entity: e.target.value,
                          })
                        }
                        required={true}
                        error={formErrors?.entity}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <Grid columns={2}>
                        <Grid.Row>
                          <Grid.Column>
                            <label>Ciudad</label>
                            {//@ts-ignore
                              <Form.Select
                                fluid
                                placeholder={town ? town : editData?.town_name}
                                name="numero_documento"
                                className="select--val"
                                onClick={() => handelDropdown("town")}
                                required={true}
                                error={formErrors?.town}
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
                          <Grid.Column>
                            <label>Año</label>
                            <Form.Input
                              fluid
                              placeholder=""
                              name="numero_documento"
                              type="number"
                              value={editData?.year}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  year: e.target.value,
                                })
                              }
                              required={true}
                              error={formErrors?.year}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Grid.Column>
                    <Grid.Column>
                      <label>Área</label>
                      {//@ts-ignore
                      <Form.Select
                      fluid
                      placeholder={area ? area : editData?.area_text}
                      className="select--val"
                      onClick={() => handelDropdown("area")}
                      required={true}
                      error={formErrors?.area}
                      />
                    }
                      {openDropdown && openDropdown == "area" ? (
                        <Grid columns={1} className="select__box">
                          <Grid.Row>
                            <Grid.Column className="select__box_clm">
                              <Grid>
                                {masterFilter("area_knowledge").map(
                                  (item:any, i:any) => {
                                    return (
                                      <p
                                        key={i}
                                        className={`form-slct ${editData?.area == item.id
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
                          labelPosition="right"
                          value={
                            selectPhoto?.name
                              ? selectPhoto?.name
                              : editData?.document
                          }
                          placeholder=""
                          className="input--adj"
                          onClick={() => handelClickPhotoImg()}
                          style={{ width: '90%' }}
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

import { validate } from "@babel/types";
import React, { useEffect, useState } from "react";
import {
  Select,
  Form,
  Divider,
  Header,
  Button,
  Modal,
  Image,
  Grid,
  Embed,
} from "semantic-ui-react";
export default function ViewEducationjurados(props) {
  const [openDropdown, setOpenDropdown] = useState("");
  const [valueda, setvalueda] = useState(null);
  const [placeGender, setPlaceGender] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(()=>{
     addressCheck()
  },[props.addreeValueData])

  async function addressCheck(){
   
    if(props.addreeValueData){
        const dd = JSON.parse(props.addreeValueData);
        setAddressData(dd);
        setPlaceZona(dd?.zona)
        setPlaceZonaOpt(dd?.zona_opt)
        setPlaceTipo(dd?.tipo_via)
    }
  }
  
  const [tipoDeVia, setTipoDeVia] = useState([
    { value: "Calle", text: "Calle" },
    { value: "Carrera", text: "Carrera" },
    { value: "Avenida", text: "Avenida" },
    { value: "Anillo", text: "Anillo" },
    { value: " Transversal", text: "Transversal" },
  ]);
  const [zona, setZona] = useState([
    { value: "Sur", text: "Sur" },
    { value: "Norte", text: "Norte" },
  ]);

  async function handelDropdown(type) {
    const valDro = openDropdown == type ? "" : openDropdown != type ? type : "";
    setOpenDropdown(valDro);
  }
  const [addressData, setAddressData] = useState({
    tipo_via: "",
    numero: "",
    letra: "",
    zona: "",
    hase_val: "",
    numero_opt: "",
    letra_opt: "",
    zona_opt: "",
    numero_opt_new: "",
    observaciones: "",
  });
  const [placeZona, setPlaceZona] = useState("");
  const [placeZonaOpt, setPlaceZonaOpt] = useState("");
  const [placeTipo, setPlaceTipo] = useState("");
  
  async function handleSelectChange(type, item) {
    if (type == "tipo") {
      setAddressData({
        ...addressData,
        tipo_via: item.value,
      });
      setvalueda(item.value);
      setPlaceTipo(item.value);
    }
    if (type == "zona") {
      setPlaceZona(item.value);
      setAddressData({
        ...addressData,
        zona: item.value,
      });
    }
    if (type == "zona_opt") {
      setPlaceZonaOpt(item.value);
      setAddressData({
        ...addressData,
        zona_opt: item.value,
      });
    }
    setOpenDropdown("");
  }

  const [formErrors, setFormErrors] = useState();

  async function formValidationChk() {
    let formErrors = {};
    let formIsValid = true;

    if (!addressData.tipo_via) {
      formIsValid = false;
      formErrors["tipo_via"] = "Tipo de vía is required !";
    }
    if (!addressData.numero) {
      formIsValid = false;
      formErrors["numero"] = "Número is required !";
    }
    if (!addressData.letra) {
      formIsValid = false;
      formErrors["letra"] = "Letra is required !";
    }
    if (!addressData.zona) {
      formIsValid = false;
      formErrors["zona"] = "Zona is required !";
    }
    if (!addressData.hase_val) {
      formIsValid = false;
      formErrors["hase_val"] = "Value is required !";
    }
    if (!addressData.numero_opt) {
      formIsValid = false;
      formErrors["numero_opt"] = "Número is required !";
    }
    if (!addressData.numero_opt_new) {
      formIsValid = false;
      formErrors["numero_opt_new"] = "Número is required !";
    }

    setFormErrors(formErrors);
    return formIsValid;
  }

  async function addressConfirm() {
    if (formValidationChk()) {
      if (
        addressData.tipo_via != "" &&
        addressData.numero != "" &&
        addressData.letra != "" &&
        addressData.zona != "" &&
        addressData.numero_opt != "" &&
        addressData.numero_opt_new != ""
        ) {
          const valuePat =
          addressData.tipo_via +
          " " +
          addressData.numero +
          " " +
          addressData.letra +
          " " +
          addressData.zona +
          " " +
          addressData.hase_val +
          " " +
          addressData.numero_opt +
          " " +
          addressData.letra_opt +
          " " +
          addressData.zona_opt +
          " " +
          addressData.numero_opt_new +
          " " +
          addressData.observaciones;
          
          console.log("setAddreeValueData: vvvv");
          props.setAddreeValueData(JSON.stringify(addressData));
          props.setAddreeValue(valuePat);
          props.setViewAddressModel(false);
        }
      }
    }
   
    return (
      <div>
      <Modal
        onClose={() => props.setViewAddressModel(false)}
        onOpen={() => props.setViewAddressModel(true)}
        open={props.viewAddressModel}
        className="view-address--model"
      >
        <Modal.Content className="model--containt">
          <Grid className="model--headr">
            <Grid.Column floated="left" width={10}>
              <Header as="h4" className="jura--form-heading" floated="left">
                Ingrese la dirección
              </Header>
            </Grid.Column>
            <Grid.Column
              floated="right text-right"
              width={5}
              style={{ textAlign: "right" }}
            >
              <p
                className="model--close-icon"
                onClick={() => props.setViewAddressModel(false)}
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
                      <Form className="form--dec-input">
                        <label>Tipo de vía</label>
                        <Form.Field className="mb-0">
                          <Form.Select
                            placeholder={placeTipo}
                            onClick={() => handelDropdown("tipo")}
                            className="select--val"
                            error={
                              !addressData.tipo_via && formErrors?.tipo_via
                            }
                          />
                          {openDropdown && openDropdown == "tipo" ? (
                            <Grid columns={1} className="select__box">
                              <Grid.Row>
                                <Grid.Column className="select__box_clm">
                                  <Grid>
                                    {tipoDeVia.map((item, i) => {
                                      return (
                                        <p key={i} className="select__value">
                                          <p
                                            onClick={() => (
                                              handleSelectChange("tipo", item),
                                              setPlaceGender(item.text)
                                            )}
                                            className={`form-slct_text ${addressData.tipo_via == item.value ? 'active':''}`}
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
                        </Form.Field>
                      </Form>
                    </Grid.Column>
                    <Grid.Column>
                      <label>Número</label>
                      <Form.Input
                        fluid
                        value={addressData.numero}
                        name="numero_documento"
                        type="text"
                        onChange={(e) =>
                          setAddressData({
                            ...addressData,
                            numero: e.target.value,
                          })
                        }
                        error={!addressData.numero && formErrors?.numero}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <label>Letra</label>
                      <Form.Input
                        fluid
                        placeholder=""
                        name="numero_documento"
                        type="text"
                        value={addressData.letra}
                        onChange={(e) =>
                          setAddressData({
                            ...addressData,
                            letra: e.target.value,
                          })
                        }
                        error={!addressData.letra && formErrors?.letra}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <label>Zona</label>
                      <Form.Group>
                        <Form.Field className="mb-0">
                          <Form.Select
                            placeholder={placeZona}
                            onClick={() => handelDropdown("zona")}
                            className="select--val select-val--opt"
                            error={!addressData.zona && formErrors?.zona}
                          />
                          {openDropdown && openDropdown == "zona" ? (
                            <Grid columns={1} className="select__box">
                              <Grid.Row>
                                <Grid.Column className="select__box_clm">
                                  <Grid>
                                    {zona.map((item, i) => {
                                      return (
                                        <p key={i} className="select__value">
                                          <p
                                            onClick={() => (
                                              handleSelectChange("zona", item),
                                              setPlaceGender(item.text)
                                            )}
                                            className={`form-slct_text ${addressData.zona == item.value ? 'active':''}`}
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
                        </Form.Field>
                        <Form.Input
                          type="text"
                          placeholder="#"
                          value={addressData.hase_val}
                          width={6}
                          onChange={(e) =>
                            setAddressData({
                              ...addressData,
                              hase_val: e.target.value,
                            })
                          }
                          // error={(!addressData.hase_val)&&formErrors?.hase_val}
                        />
                      </Form.Group>
                      <Grid></Grid>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid columns={4}>
                  <Grid.Row>
                    <Grid.Column>
                      <label>Número</label>
                      <Form.Input
                        fluid
                        placeholder=""
                        name="numero_documento"
                        type="text"
                        value={addressData.numero_opt}
                        onChange={(e) =>
                          setAddressData({
                            ...addressData,
                            numero_opt: e.target.value,
                          })
                        }
                        error={
                          !addressData.numero_opt && formErrors?.numero_opt
                        }
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <label>
                        Letra<small className="text-gray">- Opcional</small>
                      </label>
                      <Form.Input
                        fluid
                        placeholder=""
                        name="numero_documento"
                        type="text"
                        value={addressData.letra_opt}
                        onChange={(e) =>
                          setAddressData({
                            ...addressData,
                            letra_opt: e.target.value,
                          })
                        }
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <label>
                        Zona <small className="text-gray">- Opcional</small>{" "}
                      </label>
                      <Form.Field className="mb-0">
                        <Form.Select
                          placeholder={placeZonaOpt}
                          onClick={() => handelDropdown("zonaOpt")}
                          className="select--val select-val--opt"
                        />
                        {openDropdown && openDropdown == "zonaOpt" ? (
                          <Grid columns={1} className="select__box">
                            <Grid.Row>
                              <Grid.Column className="select__box_clm">
                                <Grid>
                                  {zona.map((item, i) => {
                                    return (
                                      <p key={i} className="select__value">
                                        <p
                                          onClick={() => (
                                            handleSelectChange(
                                              "zona_opt",
                                              item
                                            ),
                                            setPlaceGender(item.text)
                                          )}
                                          className={`form-slct_text ${addressData.zona_opt == item.value ? 'active':''}`}
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
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <label>Número</label>
                      <Form.Input
                        fluid
                        placeholder=""
                        name="numero_documento"
                        type="text"
                        value={addressData.numero_opt_new}
                        onChange={(e) =>
                          setAddressData({
                            ...addressData,
                            numero_opt_new: e.target.value,
                          })
                        }
                        error={
                          !addressData.numero_opt_new &&
                          formErrors?.numero_opt_new
                        }
                      />
                      <Grid></Grid>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <label>
                        Observaciones
                        <small className="text-gray">- Opcional</small>
                      </label>
                      <Form.Input
                        fluid
                        value={addressData.observaciones}
                        placeholder=""
                        name="numero_documento"
                        type="text"
                        onChange={(e) =>
                          setAddressData({
                            ...addressData,
                            observaciones: e.target.value,
                          })
                        }
                      />
                      <Grid></Grid>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <label>Dirección ingresada</label>
                      <Form.Input
                        fluid
                        placeholder=""
                        type="text"
                        value={`${addressData.tipo_via} ${addressData.numero} ${addressData.letra} ${addressData.zona} ${addressData.hase_val}  ${addressData.numero_opt} ${addressData.letra_opt} ${addressData.zona_opt} ${addressData.numero_opt_new} ${addressData.observaciones}`}
                      />
                      <Grid></Grid>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Grid className="form--buton-box form--education mt-1">
                        <span className="link-font-text">Cancelar</span>
                        <Button
                          content="Aceptar"
                          className="btn btn-primary"
                          onClick={() => addressConfirm()}
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

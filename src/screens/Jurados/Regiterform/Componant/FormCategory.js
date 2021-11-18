import React, { useEffect, useState } from "react";
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
  Accordion,
  Icon,
  List,
} from "semantic-ui-react";
import checkboxSel from "../../../../assets/check-box.png";
import checkboxEm from "../../../../assets/empty-checkbox.png";
import Loader from "../../../../components/loader";

import ApiEndPoint from "../../../../utils/apiEndPoints";
import {
  setDefaultHeader,
  apiCall,
  successToast,
  errorToast,
} from "../../../../utils/httpClient";
import Sidebar from '../../../../components/NavBar';
import HeaderMenu from '../../../../components/Header';

export default function FormCategory(props) {
  const [categoryData, setCategoryData] = useState();
  const [subCategoryData, setSubCategoryData] = useState();
  useEffect(() => {
    getCategory();
  }, []);

  async function getCategory() {
    const { data } = await apiCall("POST", ApiEndPoint.GETCATEGORYLIST);
    if (data.status == 200) {
      var cat = [];
      var subCat = [];
      data.data.map((item, i) => {
        if (item.parent_id == 0) {
          cat.push(item);
        } else {
          subCat.push(item);
        }
      });
      setCategoryData(cat);
      setSubCategoryData(subCat);
    } else {
      setCategoryData([]);
    }
  }

  const [activeIndex, setActiveIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");
  const [placeEducation, setPlaceEducation] = useState("");
  const [placeEducationArea, setPlaceEducationArea] = useState("");
  const [valueda, setvalueda] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  const [formData, setFormData] = useState({
    resume_id: props.resumeData ? props.resumeData.resume_id : 0,
    knowledge: 0,
    knowledge_area: 0,
    category: [],
  });
  async function handelDropdown(type) {
    const valDro = openDropdown == type ? "" : openDropdown != type ? type : "";
    setOpenDropdown(valDro);
  }

  async function handleClick(index) {
    const newIndex = index != activeIndex ? index : null;
    setActiveIndex(newIndex);
  }
  async function handleSelectChange(type, item) {
    setvalueda(item.value);
    setOpenDropdown("");
  }

  const [selectCategory, setSelectCategory] = useState([]);
  async function handelSelctCategory(item, index) {
    let catArray = [...subCategoryData];
    let asss = selectCategory;
    var findIndex = selectCategory.findIndex(
      (x) => x.category_id === item.category_id
    );
    setSubCategoryData(catArray);
    if (findIndex > -1) {
      const sss = selectCategory.filter(function (x) {
        return x.category_id !== item.category_id;
      });
      catArray[index].status = !catArray[index]?.status;
      asss = sss;
    } else {
      if (selectCategory && selectCategory.length <= 4) {
        asss = [...selectCategory, item];
        catArray[index].status = !catArray[index]?.status;
      }
    }
    setSelectCategory(asss);
    setFormData({
      ...formData,
      category: asss,
    });
  }

  function formValidation(item) {
    let formErrors = {};
    let formIsValid = true;

    if (!formData.knowledge) {
      formIsValid = false;
      formErrors["knowledge"] = true;
    }
    if (!formData.knowledge_area) {
      formIsValid = false;
      formErrors["knowledge_area"] = true;
    }
    if (!selectCategory.length > 0) {
      formIsValid = false;
      formErrors["selectCategory"] = true;
    }
    setFormErrors(formErrors);
    return formIsValid;
  }

  async function knowledgeCatagryFormSave() {
    if (formValidation()) {
      setIsLoading(true);
      const params = {
        resume_id: formData.resume_id,
        knowledge: formData.knowledge,
        knowledge_area: formData.knowledge_area,
        category: selectCategory,
      };
      const { data } = await apiCall(
        "POST",
        ApiEndPoint.KNOWLAGECATEGORYFORM,
        params
      );

      if (data.status == 200) {
        setIsLoading(false);
        props.setShowPage(3);
        successToast(data.message);
      } else {
        setIsLoading(false);
        errorToast(data.message);
      }
    }
  }
  const masterFilter = (type) =>
    (props.masterData &&
      props.masterData.filter((item) => item.type == type)) ||
    [];

  return (
    <div>
      {isLoading && <Loader />}
      <Container fluid>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column className="form--left-box">
              <Sidebar />
            </Grid.Column>
            <Grid.Column className="form--right-box">
              <HeaderMenu />
              <Grid style={{ height: "100vh", width: "100%", margin: 0 }}>
                <Grid.Column style={{ maxWidth: "99%" }}>
                  <Form size="large">
                    <Segment>
                      <Header as="h4" className="jura--form-heading" floated="left">
                        Áreas y categorías del conocimiento -{" "}
                        <small>Todos los campos son obligatorios</small>
                      </Header>
                      <Divider clearing />
                      <Grid columns={2}>
                        <Grid.Row>
                          <Grid.Column>
                            <label>Tipo de conocimiento</label>
                            <Form.Field>
                              <Form.Select
                                placeholder={placeEducation}
                                onClick={() => handelDropdown("knowledge")}
                                className="select--val"
                                error={!formData.knowledge && formErrors?.knowledge}
                              />
                              {openDropdown && openDropdown == "knowledge" ? (
                                <Grid columns={1} className="select__box">
                                  <Grid.Row>
                                    <Grid.Column className="select__box_clm">
                                      <Grid>
                                        {masterFilter("knowledge").map((item, i) => {
                                          return (
                                            <p
                                              key={i}
                                              onClick={() =>
                                                setFormData({
                                                  ...formData,
                                                  knowledge: item.id,
                                                })
                                              }
                                              className="select__value"
                                            >
                                              <p
                                                className="form-slct_text"
                                                onClick={() => (
                                                  handleSelectChange(
                                                    "knowledge",
                                                    item
                                                  ),
                                                  setPlaceEducation(item.text)
                                                )}
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
                            </Form.Field>
                            {/* {formErrors && formErrors.knowledge && (
                        <small className="text-red">
                          {formErrors.knowledge}
                        </small>
                      )} */}
                          </Grid.Column>
                          <Grid.Column>
                            <label>Área principal de conocimiento</label>
                            <Form.Field>
                              <Form.Select
                                placeholder={placeEducationArea}
                                onClick={() => handelDropdown("knowledge_area")}
                                className="select--val"
                                error={
                                  !formData.knowledge_area &&
                                  formErrors?.knowledge_area
                                }
                              />
                              {openDropdown && openDropdown == "knowledge_area" ? (
                                <Grid columns={1} className="select__box">
                                  <Grid.Row>
                                    <Grid.Column className="select__box_clm">
                                      <Grid>
                                        {masterFilter("area_knowledge").map(
                                          (item, i) => {
                                            return (
                                              <p
                                                key={i}
                                                onClick={() =>
                                                  setFormData({
                                                    ...formData,
                                                    knowledge_area: item.id,
                                                  })
                                                }
                                                className="select__value"
                                              >
                                                <p
                                                  className="form-slct_text"
                                                  onClick={() => (
                                                    handleSelectChange(
                                                      "knowledge_area",
                                                      item
                                                    ),
                                                    setPlaceEducationArea(item.text)
                                                  )}
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
                            {/* {formErrors && formErrors.knowledge_area && (
                        <small className="text-red">
                          {formErrors.knowledge_area}
                        </small>
                      )} */}
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>

                      <Grid style={{ padding: "0px 5px" }}>
                        <Grid.Column floated="left" width={5}>
                          <p>
                            Categorías de conocimiento - <small>Selecciona 5</small>
                          </p>
                          {formErrors && formErrors.selectCategory && (
                            <small className="text-red">
                              {formErrors.selectCategory}
                            </small>
                          )}
                        </Grid.Column>

                        <Grid.Column
                          floated="right text-right"
                          width={5}
                          style={{ textAlign: "right" }}
                        >
                          <p>
                            Seleccionado{" "}
                            <span className="cat-list-no">
                              ({selectCategory.length}/5)
                            </span>{" "}
                          </p>
                        </Grid.Column>
                      </Grid>
                      <Grid columns={1}>
                        <Grid.Row>
                          <Grid.Column>
                            <Accordion
                              styled
                              className={`drop--listing-colsp
                        ${!selectCategory?.length > 0 &&
                                formErrors?.selectCategory &&
                                "activeBorder"
                                }
                        `}
                              style={{ width: "100%" }}
                            >
                              {categoryData &&
                                categoryData.map((item, i) => {
                                  i++;
                                  return (
                                    <div key={i}>
                                      <Accordion.Title
                                        active={activeIndex === i}
                                        index={0}
                                        onClick={(e) => handleClick(i)}
                                        className="list--text"
                                      >
                                        {i}. {item.category_name}{" "}
                                        <Icon name="dropdown" className="drop-icon" />
                                      </Accordion.Title>

                                      <Accordion.Content active={activeIndex === i}>
                                        <List>
                                          {subCategoryData &&
                                            subCategoryData.map((valiItm, index) => {
                                              return (
                                                <div>
                                                  {valiItm.parent_id ==
                                                    item.category_id && (
                                                      <List.Item
                                                        className="row"
                                                        style={{
                                                          display: "flex",
                                                          alignItems: "center",
                                                        }}
                                                        onClick={() =>
                                                          handelSelctCategory(
                                                            valiItm,
                                                            index
                                                          )
                                                        }
                                                      >
                                                        <Image
                                                          src={
                                                            valiItm?.status
                                                              ? checkboxSel
                                                              : checkboxEm
                                                          }
                                                          className="list--checkbox"
                                                        />
                                                        <label>
                                                          {valiItm.category_name}
                                                        </label>
                                                      </List.Item>
                                                    )}
                                                </div>
                                              );
                                            })}
                                        </List>
                                      </Accordion.Content>
                                    </div>
                                  );
                                })}
                            </Accordion>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>

                      <Divider clearing />
                      <Grid columns={2} divided>
                        <Grid.Row>
                          <Grid.Column>
                            <Button
                              content="Atrás"
                              className="btn btn-primary"
                              onClick={() => props.goBack(1)}
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <Button
                              content="Guardar y Continuar"
                              className="btn btn-primary right floated"
                              onClick={() => knowledgeCatagryFormSave()}
                            />
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

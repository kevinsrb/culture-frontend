import React, { useEffect, useState } from "react";
import RegistrationForm from "./Componant/RegistrationForm";
import FormCategory from "./Componant/FormCategory";
import FormEducation from "./Componant/FormEducation";
import AgregarFormEducation from "./Componant/AgregarFormEducation";
import AgregarExperienciaProfesional from "./Componant/AgregarExperienciaProfesional";
import AgregarExperienciaComoJurado from "./Componant/AgregarExperienciaComoJurado";
import AgregarReconocimeintos from "./Componant/AgregarReconocimeintos";
import AgregarPublicaciones from "./Componant/AgregarPublicaciones";
import AceptarTermAndCondition from "./Componant/AceptarTermAndCondition";
import AdministradorPostulacionesDeJurado from "./Componant/AdministradorPostulacionesDeJurado";

import { masterAction } from "../../../store/actions/masterAction";
import ApiEndPoint from "../../../utils/apiEndPoints";
import { setDefaultHeader, apiCall } from "../../../utils/httpClient";
import { useDispatch, useSelector } from "react-redux";
// let showPage =1;
export default function Index() {
  const dispatch = useDispatch();
  const [showPage, setShowPage] = useState(1);
  // const masterData = useSelector(state=>state.masterReducer)
  const [masterData, setMasterData] = useState([]);
  const [countriesData, setCountriesData] = useState([]);
  const [resumeData, setResumeData] = useState({});
  const [citiesData, setCitiesData] = useState([]);
  useEffect(() => {
    getMastersData();
    getcountrylist();
    getcitieslist();
    getShowPages();
  }, []);

  async function getMastersData() {
    const { data } = await apiCall("POST", ApiEndPoint.MASTERS);
    if (data.status == 200) {
      setMasterData(data.data);
      dispatch(masterAction(data.data));
    } else {
      setMasterData([]);
    }
  }
  async function getcountrylist() {
    const { data } = await apiCall("POST", ApiEndPoint.GETCOUNTRYLIST);
    if (data.status == 200) {
      setCountriesData(data.data);
    } else {
      setCountriesData([]);
    }
  }
  async function getcitieslist() {
    const { data } = await apiCall("POST", ApiEndPoint.GETCITIESLIST);
    if (data.status == 200) {
      setCitiesData(data.data);
    } else {
      setCitiesData([]);
    }
  }
  async function getShowPages(params) {
    const pages = await localStorage.getItem("showPage");
    if (pages >= 1) {
      await setShowPage(pages);
    }
  }

  async function setShowPages(params) {
    setShowPage(params);
    await localStorage.setItem("showPage", params >= 9 ? 1 : params);
  }

  async function goBack(params) {
    setShowPage(params);
    await localStorage.setItem("showPage", params);
  }

  return (
    <div>
      {showPage == 1 ? (
        <RegistrationForm
          setShowPage={setShowPages}
          masterData={masterData}
          countriesData={countriesData}
          citiesData={citiesData}
          setResumeData={setResumeData}
          goBack={goBack}
        />
      ) : showPage == 2 ? (
        <FormCategory
          setShowPage={setShowPages}
          masterData={masterData}
          resumeData={resumeData}
          goBack={goBack}
        />
      ) : showPage == 3 ? (
        <FormEducation
          setShowPage={setShowPages}
          masterData={masterData}
          resumeData={resumeData}
          citiesData={citiesData}
          goBack={goBack}
        />
      ) : showPage == 4 ? (
        <AgregarFormEducation
          masterData={masterData}
          setShowPage={setShowPages}
          resumeData={resumeData}
          goBack={goBack}
          citiesData={citiesData}
        />
      ) : showPage == 5 ? (
        <AgregarExperienciaProfesional
          setShowPage={setShowPages}
          masterData={masterData}
          resumeData={resumeData}
          goBack={goBack}
        />
      ) : showPage == 6 ? (
        <AgregarExperienciaComoJurado
          masterData={masterData}
          setShowPage={setShowPages}
          resumeData={resumeData}
          citiesData={citiesData}
          goBack={goBack}
        />
      ) : showPage == 7 ? (
        <AgregarReconocimeintos
          setShowPage={setShowPages}
          citiesData={citiesData}
          masterData={masterData}
          resumeData={resumeData}
          goBack={goBack}
        />
      ) : showPage == 8 ? (
        <AgregarPublicaciones
          masterData={masterData}
          setShowPage={setShowPages}
          resumeData={resumeData}
          citiesData={citiesData}
          goBack={goBack}
        />
      ) : showPage == 9 ? (
        <AceptarTermAndCondition setShowPage={setShowPages} goBack={goBack} />
      ) : showPage == 10 ? (
        <AdministradorPostulacionesDeJurado setShowPage={setShowPages} />
      ) : (
        ""
      )}
    </div>
  );
}

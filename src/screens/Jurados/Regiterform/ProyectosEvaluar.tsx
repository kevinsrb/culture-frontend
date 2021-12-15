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
import EvaluacionProyectos from "./Componant/EvaluacionProyectos";
import EvaluacionProyectosList from "./Componant/EvaluacionProyectosList";

import { masterAction } from "../../../store/actions/masterAction";
import ApiEndPoint from "../../../utils/apiEndPoints";

// @ts-ignore
import { setDefaultHeader, apiCall } from "../../../utils/httpClient";
import { useDispatch, useSelector } from "react-redux";

// let showPage =1;
export default function Index() {
  const dispatch = useDispatch();
  const [showPage, setShowPage] = useState(11);
  const [isEdit, setIsEdit] = useState(false);
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
    // setShowPages("10");
  }, []);
  console.log('showPage: ', showPage);

  // let projectInfo = useLocation();
  // let projectData = projectInfo?.state?.projectData;
  // console.log("projectData: ", projectData);

  async function getMastersData() {
    // @ts-ignore

    const { data } = await apiCall("POST", ApiEndPoint.MASTERS);
    if (data.status == 200) {
      setMasterData(data.data);
      dispatch(masterAction(data.data));
    } else {
      setMasterData([]);
    }
  }
  async function getcountrylist() {
    // @ts-ignore

    const { data } = await apiCall("POST", ApiEndPoint.GETCOUNTRYLIST);
    if (data.status == 200) {
      setCountriesData(data.data);
    } else {
      setCountriesData([]);
    }
  }
  async function getcitieslist() {
    // @ts-ignore

    const { data } = await apiCall("POST", ApiEndPoint.GETCITIESLIST);
    if (data.status == 200) {
      setCitiesData(data.data);
    } else {
      setCitiesData([]);
    }
  }
  async function getShowPages() {
    const pages: any = await localStorage.getItem("showPage");
    if (pages >= 1) {
      await setShowPage(pages);
    }
  }

  async function setShowPages(params: string) {
    // @ts-ignore
    setShowPage(params);
    await localStorage.setItem("showPage", params);
  }


  async function goBack(params: string) {
    // @ts-ignore

    setShowPage(params);
    await localStorage.setItem("showPage", params);
  }

  function onPressEdit(params: string, status = true) {
    // @ts-ignore
    setShowPage(params);
    setIsEdit(status);
  }

  return (
    <div>
      {showPage == 1 ? (
       <EvaluacionProyectos
       onPressEdit={onPressEdit}
       setShowPage={setShowPages}
     />
        /* <RegistrationForm
          setShowPage={setShowPages}
          masterData={masterData}
          countriesData={countriesData}
          citiesData={citiesData}
          setResumeData={setResumeData}
          goBack={goBack}
          isEdit={isEdit}
          onPressEdit={onPressEdit}
        />  */
      ) : showPage == 2 ? (
        <EvaluacionProyectos
          onPressEdit={onPressEdit}
          setShowPage={setShowPages}
        />
        /* <FormCategory
          setShowPage={setShowPages}
          masterData={masterData}
          resumeData={resumeData}
          goBack={goBack}
          onPressEdit={onPressEdit}
          isEdit={isEdit}
        /> */
      ) : showPage == 3 ? (
        <FormEducation
          setShowPage={setShowPages}
          masterData={masterData}
          resumeData={resumeData}
          citiesData={citiesData}
          goBack={goBack}
          onPressEdit={onPressEdit}
          isEdit={isEdit}
        />
      ) : showPage == 4 ? (
        <AgregarFormEducation
          masterData={masterData}
          setShowPage={setShowPages}
          resumeData={resumeData}
          goBack={goBack}
          citiesData={citiesData}
          onPressEdit={onPressEdit}
          isEdit={isEdit}
        />
      ) : showPage == 5 ? (
        <AgregarExperienciaProfesional
          setShowPage={setShowPages}
          masterData={masterData}
          resumeData={resumeData}
          goBack={goBack}
          onPressEdit={onPressEdit}
          isEdit={isEdit}
        />
      ) : showPage == 6 ? (
        <AgregarExperienciaComoJurado
          masterData={masterData}
          setShowPage={setShowPages}
          resumeData={resumeData}
          citiesData={citiesData}
          goBack={goBack}
          onPressEdit={onPressEdit}
          isEdit={isEdit}
        />
      ) : showPage == 7 ? (
        <AgregarReconocimeintos
          setShowPage={setShowPages}
          citiesData={citiesData}
          masterData={masterData}
          resumeData={resumeData}
          goBack={goBack}
          isEdit={isEdit}
          onPressEdit={onPressEdit}
        />
      ) : showPage == 8 ? (
        <AgregarPublicaciones
          masterData={masterData}
          setShowPage={setShowPages}
          resumeData={resumeData}
          citiesData={citiesData}
          goBack={goBack}
          isEdit={isEdit}
          onPressEdit={onPressEdit}
        />
      ) : showPage == 9 ? (
        <AceptarTermAndCondition setShowPage={setShowPages} goBack={goBack} />
      ) : showPage == 10 ? (
        <AdministradorPostulacionesDeJurado
          onPressEdit={onPressEdit}
          setShowPage={setShowPages}
        />
      ) : showPage == 11 ? (
        <EvaluacionProyectos
          onPressEdit={onPressEdit}
          setShowPage={setShowPages}
        />
      ) : showPage == 12 ? (
        <EvaluacionProyectosList />
      ) : (
        ""
      )}
    </div>
  );
}

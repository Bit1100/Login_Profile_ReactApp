import { useContext } from "react";
import Form from "./Form";
import { context } from "../context";
import { SyncLoader } from 'react-spinners';
import { css } from '@emotion/react';
const styles = css `
      position: fixed;
      top: 40%;
      left: 40%;
      transform: translate(0%, 0%);
      transform-origin: center;
      transition: all 0.3s ease;
      z-index: 1;
`

const Modal = () => {
  const { setShowLoader,showLoader,setFormdata, setError, modalActive, setModalActive } = useContext(
    context
  );

  function hideLoader(){
    setTimeout(() => {
      setShowLoader(false);
    }, 2000);
  }

  return !modalActive ? (
    ""
  ) : (
    <>
      <div
        onClick={() => {
          setFormdata({});
          setError({ msg: "", errStatus: false, msgClass: "" });
          setModalActive(false);
        }}
        className={modalActive ? "overlay overlay-active" : "overlay"}
      ></div>
      {
        showLoader ? (
    <SyncLoader size="50" color="skyblue" css={styles}>
           {hideLoader()}
    </SyncLoader>
        ) : (
      <div className={modalActive ? "modal modal-active" : "model"}>
        <header className="modal-header">
          <h2 className="heading">Update Details</h2>
        </header>
        <div className="flex justify-center items-center modal-body">
          <Form />
        </div>
      </div>
        )
      }
    </>
  );
};

export default Modal;

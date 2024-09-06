import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreatingOrderNavigation from "../CreatigOrderNavigation";
import constants from "../../../common/constants";
import AddressAutocomplete from "../../Common/AddressAutocomplete";
import { updateTestatorSlice } from "../../../features/people/testator/testatorSlice";
import { updateSpouseOrPartnerSlice, resetSpouseOrPartnerSlice } from "../../../features/people/spouseOrPartner/spouseOrPartnerSlice";
import spouseOrPartnerThunks from "../../../features/people/spouseOrPartner/spouseOrPartnerThunks";
import { updateCurrentOrderSlice, updateOrderThunk } from "../../../features/currentOrder/currentOrderSlice";
import testatorThunks from "../../../features/people/testator/testatorThunks";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/esm/Col";


const SpouseOrPartner = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentOrder = useSelector(state => state.currentOrder);
  const testator = useSelector(state => state.testator)
  const spouseOrPartner = useSelector(state => state.spouseOrPartner)
  const [currentMaritalStatus, setMaritalStatus] = useState(testator.maritalStatus)
  const savedSpouseOrPartnerData = useRef(null);
  const savedTestatorData = useRef(null);
  const initialMaritalStatus = useRef(testator.maritalStatus);
  const [spouseOrPartnerFormData, setSpouseOrPartnerFormData] = useState({
    _id: '',
    title: '',
    fullLegalName: '',
    fullAddress: '',
    dob: '',
    email: '',
    tel: ''
  });


  useEffect(() => {
    if (spouseOrPartner) {
      setSpouseOrPartnerFormData({
        _id: spouseOrPartner._id || '',
        title: spouseOrPartner.title || '',
        fullLegalName: spouseOrPartner.fullLegalName || '',
        fullAddress: spouseOrPartner.fullAddress || '',
        dob: spouseOrPartner.dob ? new Date(spouseOrPartner.dob).toISOString().split('T')[0] : '',
        email: spouseOrPartner.email || '',
        tel: spouseOrPartner.tel || ''
      });

      if (!savedSpouseOrPartnerData.current) {
        savedSpouseOrPartnerData.current = JSON.parse(JSON.stringify(spouseOrPartner));
      }

      if (!savedTestatorData.current) {
        savedTestatorData.current = JSON.parse(JSON.stringify(testator));
      }
    }
  }, [spouseOrPartner]
  );


  useEffect(() => {
    // Check if the marital status has changed to single or widowed
    if ((initialMaritalStatus.current !== constants.maritalStatus.SINGLE
      || currentMaritalStatus === constants.maritalStatus.WIDOWED)
      && (
        currentMaritalStatus === constants.maritalStatus.SINGLE
        || currentMaritalStatus === constants.maritalStatus.WIDOWED)
    ) {
      dispatch(resetSpouseOrPartnerSlice());
    }
  }, [currentMaritalStatus, dispatch]
  );


  const handleBack = () => {
    // Revert to the saved state
    if (savedTestatorData.current) {
      dispatch(updateTestatorSlice(savedTestatorData.current));
    }
    if (savedSpouseOrPartnerData.current) {
      dispatch(updateSpouseOrPartnerSlice(savedSpouseOrPartnerData.current));
    }
    navigate('/creatingOrder');
  };


  const handleSaveAndContinue = async (e) => {
    e.preventDefault();
    let updatedPeopleAndRoles = currentOrder.peopleAndRoles;

    // Check if marital status changed from spouse/partner to single or widowed
    if ((initialMaritalStatus.current === constants.maritalStatus.MARRIED
      || initialMaritalStatus.current === constants.maritalStatus.PARTNER)
      && (currentMaritalStatus !== constants.maritalStatus.MARRIED
        && currentMaritalStatus !== constants.maritalStatus.PARTNER)) {

      updatedPeopleAndRoles = currentOrder.peopleAndRoles.filter(pr =>
        !pr.role.includes(constants.role.SPOUSE) && !pr.role.includes(constants.role.PARTNER)
      );

      // Update the current order slice
      const updatedOrder = {
        ...currentOrder,
        peopleAndRoles: updatedPeopleAndRoles
      };

      await dispatch(updateCurrentOrderSlice(updatedOrder));

      await dispatch(updateOrderThunk(updatedOrder));
    }
    else {
      if (!spouseOrPartner._id
        && (currentMaritalStatus === constants.maritalStatus.MARRIED
          || currentMaritalStatus === constants.maritalStatus.PARTNER)
      ) {
        const createSpouseOrPartnerResponse = await dispatch(
          spouseOrPartnerThunks.createSpouseOrPartnerThunk(spouseOrPartner)).unwrap();

        if (createSpouseOrPartnerResponse) {
          let role;
          if (currentMaritalStatus === constants.maritalStatus.MARRIED) role = constants.role.SPOUSE;
          if (currentMaritalStatus === constants.maritalStatus.PARTNER) role = constants.role.PARTNER;

          // Update the peopleAndRoles with the new spouse/partner
          updatedPeopleAndRoles = [
            ...currentOrder.peopleAndRoles,
            {
              personId: createSpouseOrPartnerResponse._id,
              role: [role]
            }
          ];

          // Update the current order slice
          const updatedOrder = {
            ...currentOrder,
            peopleAndRoles: updatedPeopleAndRoles
          };

          await dispatch(updateCurrentOrderSlice(updatedOrder));
          await dispatch(updateOrderThunk(updatedOrder));
        }
      } else {
        await dispatch(spouseOrPartnerThunks.updateSpouseOrPartnerThunk(spouseOrPartner));
      }
    }

    // Update testator's marital status if it has changed
    if (initialMaritalStatus.current !== currentMaritalStatus) {
      await dispatch(testatorThunks.updateTestatorThunk({ ...testator, maritalStatus: currentMaritalStatus }));
    }

    navigate('/creatingOrder');
  };


  const handleMaritalStatusChange = (e) => {
    const updatedMaritalStatus = e.target.value;
    setMaritalStatus(updatedMaritalStatus);

    if (testator) {
      dispatch(updateTestatorSlice({ ...testator, maritalStatus: updatedMaritalStatus }))
    }
  }


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSpouseOrPartnerFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    dispatch(updateSpouseOrPartnerSlice({ ...spouseOrPartnerFormData, [name]: value }));
  };


  const handlePlaceSelected = (address) => {
    setSpouseOrPartnerFormData((prevData) => ({
      ...prevData,
      fullAddress: address
    }));

    dispatch(updateSpouseOrPartnerSlice({ ...spouseOrPartnerFormData, fullAddress: address }));
  };


  return (
    <>
      <Container className=" mb-4 min-height-container">
        <Container className="mt-5 mb-5 ">
          <Row>
            <Col className="d-flex justify-content-center pb-3">
              <h4>What is your marital status?</h4>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col xs={{ span: 11, offset: 1 }} md={{ span: 2, offset: 0 }}
              className="d-flex justify-content-md-center justify-content-xs-start p-1 p-md-0">
              <input
                type="radio"
                id="marital-status-married"
                name="marital-status"
                value={constants.maritalStatus.MARRIED}
                checked={currentMaritalStatus === constants.maritalStatus.MARRIED}
                onChange={handleMaritalStatusChange}></input>
              <label htmlFor="marital-status-married">Married</label>
            </Col>
            <Col xs={{ span: 11, offset: 1 }} md={{ span: 2, offset: 0 }}
              className="d-flex justify-content-md-center justify-content-xs-start p-1 p-md-0">
              <input
                type="radio"
                id="marital-status-partner"
                name="marital-status"
                value={constants.maritalStatus.PARTNER}
                checked={currentMaritalStatus === constants.maritalStatus.PARTNER}
                onChange={handleMaritalStatusChange}></input>
              <label htmlFor="marital-status-partner">Living with partner</label>
            </Col>
            <Col xs={{ span: 11, offset: 1 }} md={{ span: 2, offset: 0 }}
              className="d-flex justify-content-md-center justify-content-xs-start p-1 p-md-0">
              <input
                type="radio"
                id="marital-status-widowed"
                name="marital-status"
                value={constants.maritalStatus.WIDOWED}
                checked={currentMaritalStatus === constants.maritalStatus.WIDOWED}
                onChange={handleMaritalStatusChange}></input>
              <label htmlFor="marital-status-widowed">Widowed</label>
            </Col>
            <Col xs={{ span: 11, offset: 1 }} md={{ span: 2, offset: 0 }}
              className="d-flex justify-content-md-center justify-content-xs-start p-1 p-md-0">
              <input
                type="radio"
                id="marital-status-single"
                name="marital-status"
                value={constants.maritalStatus.SINGLE}
                checked={currentMaritalStatus === constants.maritalStatus.SINGLE}
                onChange={handleMaritalStatusChange}></input>
              <label htmlFor="marital-status-single">Single</label>
            </Col>
          </Row >
        </Container>
        <Container className="mt-5">
          {(currentMaritalStatus === constants.maritalStatus.MARRIED
            || currentMaritalStatus === constants.maritalStatus.PARTNER)
            &&
            (<>
              <Row className="mb-4">
                <Col className="d-flex justify-content-center">
                  <h4>Please enter your {currentMaritalStatus === constants.maritalStatus.MARRIED
                    ? constants.role.SPOUSE
                    : currentMaritalStatus === constants.maritalStatus.PARTNER
                      ? constants.role.PARTNER : ""} details.</h4>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col xs={12} md={4} className="mx-auto">
                  <Form>
                    <Form.Group className="mb-3" controlId="formGroupTitle">
                      <Form.Label className="bold-label">Title</Form.Label>
                      <Form.Control
                        as="select"
                        name="title"
                        value={spouseOrPartnerFormData.title}
                        onChange={handleOnChange}
                        required
                        className="custom-input"
                      >
                        {Object.values(constants.title).map((title, index) => (
                          <option key={index} value={title}>
                            {title}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupFullLegalName">
                      <Form.Label className="bold-label">Full legal name</Form.Label>
                      <Form.Control
                        type="text"
                        name="fullLegalName"
                        value={spouseOrPartnerFormData.fullLegalName}
                        onChange={handleOnChange}
                        required
                        className="custom-input"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupFullAddress">
                      <Form.Label className="bold-label">Full address</Form.Label>
                      <AddressAutocomplete
                        name="fullAddress"
                        value={spouseOrPartnerFormData.fullAddress}
                        onPlaceSelected={handlePlaceSelected}
                        handleInputChange={handleOnChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupDob">
                      <Form.Label className="bold-label">Date of birth</Form.Label>
                      <Form.Control
                        type="date"
                        name="dob"
                        value={spouseOrPartnerFormData.dob}
                        onChange={handleOnChange}
                        required
                        className="custom-input"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label className="bold-label">Email (optional)</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={spouseOrPartnerFormData.email}
                        onChange={handleOnChange}
                        className="custom-input"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPhone">
                      <Form.Label className="bold-label">Phone Number (optional)</Form.Label>
                      <Form.Control
                        type="tel"
                        name="tel"
                        value={spouseOrPartnerFormData.tel}
                        onChange={handleOnChange}
                        className="custom-input"
                      />
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </>)}
        </Container >
      </Container>
      <Container>
        <CreatingOrderNavigation
          onBack={handleBack}
          onSaveAndContinue={handleSaveAndContinue}
        />
      </Container>
    </>
  );
}


export default SpouseOrPartner;


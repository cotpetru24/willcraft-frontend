import OrderNavigation from "../CreatigOrderNavigation";
import constants from "../../../common/constants";
import AddressAutocomplete from "../../Common/AddressAutocomplete";
import SectionListItem from "../../SectionListItem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import styles from "../../../common/styles";
import { updateCurrentOrderSlice, updateOrderThunk } from "../../../features/currentOrder/currentOrderSlice";
import { updateAssetsSlice, createAssetThunk, updateAssetThunk } from "../../../features/orderAssets/orderAssetsSlice"
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";


const Assets = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentOrder = useSelector(state => state.currentOrder);
    const assets = useSelector(state => state.assets)
    const [showAssetForm, setshowAssetForm] = useState(false);
    const [editAssetIndex, setEditAssetIndex] = useState(null);
    const savedAssetsData = useRef(null);
    let asset;
    const [assetType, setAssetType] = useState('');
    const [assetFormData, setAssetFormData] = useState({
        _id: '',
        assetType: '',
        bankName: '',
        provider: '',
        companyName: '',
        propertyAddress: '',
        otherAssetDetails: ''

    });


    useEffect(() => {
        if (asset) {
            setAssetFormData({})
        }
        if (!savedAssetsData.current) {
            savedAssetsData.current = JSON.parse(JSON.stringify(assets));
        }
    }, [assets]);


    const handleshowAssetForm = () => {
        setshowAssetForm(prevState => !prevState);
    };


    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setAssetFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleAssetFormAdd = (e) => {
        e.preventDefault();

        if (editAssetIndex !== null) {
            const updatedAssets = assets.map((asset, index) =>
                index === editAssetIndex ? assetFormData : asset
            );
            dispatch(updateAssetsSlice(updatedAssets));
            setEditAssetIndex(null);
        } else {
            dispatch(updateAssetsSlice([...assets, assetFormData]));
        }
        resetAssetForm();
        setshowAssetForm(false);
    };


    const resetAssetForm = () => {
        setAssetFormData({
            _id: '',
            assetType: '',
            bankName: '',
            provider: '',
            companyName: '',
            propertyAddress: '',
            otherAssetDetails: '',

        });
        setEditAssetIndex(null);
    };


    const handleRemoveAsset = (index) => {
        const updatedAssets = assets.filter((_, i) => i !== index);
        dispatch(updateAssetsSlice(updatedAssets));
    };


    const handleEditAsset = (index) => {
        const assetToEdit = assets[index];

        setAssetFormData({
            _id: assetToEdit._id || '',
            assetType: assetToEdit.assetType || '',
            bankName: assetToEdit.bankName || '',
            provider: assetToEdit.provider || '',
            companyName: assetToEdit.companyName || '',
            propertyAddress: assetToEdit.propertyAddress || '',
            otherAssetDetails: assetToEdit.otherAssetDetails || '',
        });
        setEditAssetIndex(index);
        setshowAssetForm(true);
    };


    const handleSaveAndContinue = async (e) => {
        e.preventDefault();

        const updatedAssets = [];

        for (const asset of assets) {
            let response;
            if (asset._id) {
                response = await dispatch(updateAssetThunk(asset)).unwrap();
            }
            else {
                response = await dispatch(createAssetThunk(asset)).unwrap();
            }
            updatedAssets.push({
                ...asset,
                _id: response._id,
                distribution: []
            });
        }

        await dispatch(updateAssetsSlice(updatedAssets));

        const updatedOrder = {
            ...currentOrder,
            assetsAndDistribution: [
                ...updatedAssets.map(asset => ({
                    assetId: asset._id,
                    assetDistribution: []
                }))
            ]
        };

        await dispatch(updateCurrentOrderSlice(updatedOrder));
        await dispatch(updateOrderThunk(updatedOrder));

        navigate('/creatingOrder');
    };


    const handleBack = () => {
        if (savedAssetsData.current) {
            dispatch(updateAssetsSlice(savedAssetsData.current));
        }
        navigate('/creatingOrder');
    };


    const handlePlaceSelected = (address) => {
        setAssetFormData((prevData) => ({
            ...prevData,
            propertyAddress: address
        }));
    };


    const handleAssetTypeChange = (e) => {
        const selectedType = e.target.value;
        setAssetType(selectedType);
        setAssetFormData(prevState => ({
            ...prevState,
            assetType: selectedType
        }));
    };


    return (
        <>
            <Container className="mt-5 mb-4 min-height-container ps-4 pe-4">
                <Row className="mt-3 mb-4 justify-content-center">
                    <Col xs={12} className="mx-auto">
                        <h1 className="auth-header">Your Assets</h1>
                    </Col>
                </Row>
                <Row className="mt-3 mb-4 justify-content-center">
                    <Col xs={12} className="mx-auto d-flex justify-content-center">
                        <h5>Please add all the assets that you want to include in the will.</h5>
                    </Col>
                </Row>
                <Row className="justify-content-between">
                    <Col md={5} className="mt-4">
                        <Row>
                            <Col className="ps-0 pe-0">
                                {assets.map((asset, index) => (
                                    <SectionListItem
                                        key={index}
                                        buttonsDisabled={showAssetForm}
                                        data={asset}
                                        onRemove={() => handleRemoveAsset(index)}
                                        onEdit={() => handleEditAsset(index)}
                                        section="assets"
                                    />
                                ))}
                            </Col>
                        </Row>
                        <Row>
                            <Col className="ps-0 pe-0">
                                <Button
                                    variant="success"
                                    className="m-3"
                                    onClick={handleshowAssetForm}
                                    style={showAssetForm ? styles.disabledButton : {}}
                                    disabled={showAssetForm}
                                >
                                    +Add Asset
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4} className="pt-4">
                        {showAssetForm && (
                            <Row>
                                <Col >
                                    <Form onSubmit={handleAssetFormAdd}>
                                        <Form.Group className="mb-3" controlId="formGroupAssetType">
                                            <Form.Label className="bold-label">Asset type</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="assetType"
                                                value={assetFormData.assetType}
                                                onChange={handleAssetTypeChange}
                                                required
                                                className="custom-input"
                                            >
                                                <option value="" disabled>Select asset type</option>
                                                {Object.values(constants.assetType).map((assetType, index) => (
                                                    <option key={index} value={assetType}>
                                                        {assetType}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                        {assetFormData.assetType === constants.assetType.PROPERTY && (
                                            <Form.Group className="mb-3" controlId="formGroupPropertyAddress">
                                                <Form.Label className="bold-label">Property Address</Form.Label>
                                                <AddressAutocomplete
                                                    name="propertyAddress"
                                                    value={assetFormData.propertyAddress}
                                                    onPlaceSelected={handlePlaceSelected}
                                                    handleInputChange={handleOnChange}
                                                    className="custom-input"
                                                />
                                            </Form.Group>
                                        )}
                                        {assetFormData.assetType === constants.assetType.BANK_ACCOUNT && (
                                            <Form.Group className="mb-3" controlId="formGroupBankName">
                                                <Form.Label className="bold-label">Bank name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="bankName"
                                                    value={assetFormData.bankName}
                                                    onChange={handleOnChange}
                                                    className="custom-input"
                                                />
                                            </Form.Group>
                                        )}
                                        {assetFormData.assetType === constants.assetType.STOCKS_AND_SHARES && (
                                            <Form.Group className="mb-3" controlId="formGroupCompanyName">
                                                <Form.Label className="bold-label">Company name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="companyName"
                                                    value={assetFormData.companyName}
                                                    onChange={handleOnChange}
                                                    className="custom-input"
                                                />
                                            </Form.Group>
                                        )}
                                        {(assetFormData.assetType === constants.assetType.PENSION
                                            || assetFormData.assetType === constants.assetType.LIFE_INSURANCE) && (
                                                <Form.Group className="mb-3" controlId="formGroupProvider">
                                                    <Form.Label className="bold-label">Provider</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="provider"
                                                        value={assetFormData.provider}
                                                        onChange={handleOnChange}
                                                        className="custom-input"
                                                    />
                                                </Form.Group>
                                            )}
                                        {assetFormData.assetType === constants.assetType.OTHER && (
                                            <Form.Group className="mb-3" controlId="formGroupAssetDetails">
                                                <Form.Label className="bold-label">Details</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="otherAssetDetails"
                                                    value={assetFormData.otherAssetDetails}
                                                    onChange={handleOnChange}
                                                    className="custom-input"
                                                />
                                            </Form.Group>
                                        )}
                                        <Row>
                                            <Col>
                                                <Button
                                                    variant="primary"
                                                    className="m-1 add-edit-form-btn"
                                                    type="button"
                                                    onClick={() => {
                                                        handleshowAssetForm();
                                                        resetAssetForm();
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                            </Col>
                                            <Col className="d-flex justify-content-end">
                                                <Button
                                                    variant="primary"
                                                    className="m-1 add-edit-form-btn"
                                                    type="submit"
                                                >
                                                    {editAssetIndex !== null ? "Update" : "Add"}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
                        )}
                    </Col>
                </Row>
            </Container>
            <>
                <Container>
                    <OrderNavigation
                        onBack={handleBack}
                        onSaveAndContinue={handleSaveAndContinue}
                        buttonsDisabled={showAssetForm}
                    />
                </Container>
            </>
        </>
    )
}


export default Assets;


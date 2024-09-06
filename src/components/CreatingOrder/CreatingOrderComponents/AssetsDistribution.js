import constants from "../../../common/constants";
import AddressAutocomplete from "../../Common/AddressAutocomplete";
import SectionListItem from "../../SectionListItem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import styles from "../../../common/styles";
import { updateCurrentOrderSlice, updateOrderThunk } from "../../../features/currentOrder/currentOrderSlice";
import { updateAssetsSlice } from "../../../features/orderAssets/orderAssetsSlice";
import { updateAdditionalBeneficiariesSlice } from "../../../features/people/additionalBeneficiaries/additionalBeneficiariesSlice";
import { createAdditionalBeficiaryThunk, deleteAdditionalBeficiaryThunk, updateAdditionalBeficiaryThunk } from "../../../features/people/additionalBeneficiaries/additionalBeneficiariesThunks";
import { Container, Row, Col, Form, Button, Accordion, InputGroup } from 'react-bootstrap';
import CreatingOrderNavigation from "../CreatigOrderNavigation";
import { useMediaQuery } from 'react-responsive';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AssetsDistribution = () => {

    const isXs = useMediaQuery({ maxWidth: 767 });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentOrder = useSelector(state => state.currentOrder);
    const assets = useSelector(state => state.assets);
    const additionalBeneficiaries = useSelector(state => state.additionalBeneficiaries);
    const [receivingAmount, setReceivingAmount] = useState('');
    const [totalPercentage, setTotalPercentage] = useState({});
    const [potentialBeneficiaries, setPotentialBeneficiaries] = useState([]);
    const [additionalBeneficiariesToRemove, setAdditionalBeneficiariesToRemove] = useState([]);
    const [additionalBeneficiariesToUpdate, setAdditionalBeneficiariesToUpdate] = useState([]);
    const [showAdditionalBeneficiaryForm, setShowAdditionalBeneficiaryForm] = useState(false);
    const [editAdditionalBeneficiaryIndex, setEditAdditionalBeneficiaryIndex] = useState(null);
    const savedAdditionalBeneficiariesData = useRef(null);
    const savedCurrentOrderData = useRef(null);
    const savedAssetsData = useRef(null);
    const toastId = useRef(null);

    let additionalBeneficiary;

    const [additionalBeneficiaryFormData, setAdditionalBeneficiaryFormData] = useState({
        _id: '',
        title: '',
        fullLegalName: '',
        fullAddress: '',
        dob: '',
        email: '',
        tel: '',
        assetId: '',
        role: 'additional beneficiary',
    });


    useEffect(() => {
        // Effect to calculate receiving amounts and total percentages
        if (additionalBeneficiary) {
            setAdditionalBeneficiaryFormData({
                _id: additionalBeneficiary._id || '',
                title: additionalBeneficiary.title || '',
                fullLegalName: additionalBeneficiary.fullLegalName || '',
                fullAddress: additionalBeneficiary.fullAddress || '',
                dob: additionalBeneficiary.dob ? new Date(additionalBeneficiary.dob).toISOString().split('T')[0] : '',
                email: additionalBeneficiary.email || '',
                tel: additionalBeneficiary.tel || '',
                assetId: additionalBeneficiary.assetId || ''
            });
        }

        if (!savedAdditionalBeneficiariesData.current) {
            savedAdditionalBeneficiariesData.current = JSON.parse(JSON.stringify(additionalBeneficiaries));
        }
        if (!savedCurrentOrderData.current) {
            savedCurrentOrderData.current = JSON.parse(JSON.stringify(currentOrder));
        }
        if (!savedAssetsData.current) {
            savedAssetsData.current = JSON.parse(JSON.stringify(assets));
        }

        // Compute receiving amounts and total percentages
        const updatedAssets = assets.map((asset, assetIndex) => {
            let total = 0;

            const updatedDistribution = asset.distribution.map(dist => {
                const receivingAmount = parseFloat(dist.receivingAmount) || 0;
                total += receivingAmount;
                return {
                    ...dist,
                    receivingAmount
                };
            });

            // Only update the state if there is a change
            if (total !== totalPercentage[assetIndex]) {
                setTotalPercentage(prev => ({ ...prev, [assetIndex]: total }));
            }
            return {
                ...asset,
                distribution: updatedDistribution
            };
        });

        // Dispatch if there's a change
        if (JSON.stringify(updatedAssets) !== JSON.stringify(assets)) {
            dispatch(updateAssetsSlice(updatedAssets));
        }

    }, [additionalBeneficiaries, currentOrder, assets, totalPercentage]);


    useEffect(() => {
        const updatedPotentialBeneficiaries = [
            ...currentOrder.peopleAndRoles.filter(p =>
                p.role.includes('partner')
                || p.role.includes('kid')
                || p.role.includes('spouse')
            ),
            ...additionalBeneficiaries.map(beneficiary => ({
                ...beneficiary,
                role: 'additional beneficiary'
            }))
        ];

        setPotentialBeneficiaries(updatedPotentialBeneficiaries);
    }, [currentOrder.peopleAndRoles, additionalBeneficiaries]);


    useEffect(() => {
        // Initialize receiving amounts and total percentages for each asset
        const updatedAssets = assets.map((asset, assetIndex) => {
            let total = 0;

            const updatedDistribution = asset.distribution.map(dist => {
                const receivingAmount = parseFloat(dist.receivingAmount) || 0;
                total += receivingAmount;

                return { ...dist, receivingAmount };
            });

            // Only update the state if there is a change
            if (total !== totalPercentage[assetIndex]) {
                setTotalPercentage(prev => ({ ...prev, [assetIndex]: total }));
            }

            return { ...asset, distribution: updatedDistribution };
        });

        // Dispatch if there's a change
        if (JSON.stringify(updatedAssets) !== JSON.stringify(assets)) {
            dispatch(updateAssetsSlice(updatedAssets));
        }
    }, [assets]);


    const handleOnChange = (value, assetIndex, personId) => {

        let assetTypeAndDescription;

        if (!Array.isArray(assets) || !assets[assetIndex]) {
            console.error("Assets array is not defined or assetIndex is out of bounds.");
            return;
        }

        const parsedValue = parseFloat(value) || 0;

        // Update the specific asset and its distribution
        const updatedAssets = assets.map((asset, index) => {
            if (index === assetIndex) {
                const updatedDistribution = asset.distribution.map(dist => {
                    // Match based on personId
                    if (dist.personId === personId || (dist.personId && dist.personId._id === personId)) {
                        return { ...dist, receivingAmount: parsedValue };
                    }
                    return dist;
                });

                // Construct the asset description
                assetTypeAndDescription = `${asset.assetType}`;
                if (asset.bankName) assetTypeAndDescription += ` - ${asset.bankName}`;
                if (asset.provider) assetTypeAndDescription += ` - ${asset.provider}`;
                if (asset.companyName) assetTypeAndDescription += ` - ${asset.companyName}`;
                if (asset.propertyAddress) assetTypeAndDescription += ` - ${asset.propertyAddress}`;
                if (asset.otherAssetDetails) assetTypeAndDescription += ` - ${asset.otherAssetDetails}`;

                return { ...asset, distribution: updatedDistribution };
            }
            return asset;
        });

        // Calculate the total percentage for the asset
        const total = updatedAssets[assetIndex].distribution.reduce((sum, dist) => sum + (parseFloat(dist.receivingAmount) || 0), 0);

        // Update the total percentage for this asset in the state
        setTotalPercentage(prev => ({ ...prev, [assetIndex]: total }));

        const CustomToast = ({ assetTypeAndDescription, total }) => (
            <div className="d-flex justify-content-center">
                Total percentage for {assetTypeAndDescription} is not 100% ! <br />
                It is currently {total}%
            </div>
        );

        if (total !== 100) {
            if (toastId.current) {
                clearTimeout(toastId.current);
            }
            toastId.current = setTimeout(() => {
                toast.warn(
                    <CustomToast assetTypeAndDescription={assetTypeAndDescription} total={total} />,
                    {
                        position: "top-center",
                        autoClose: 3000,
                    }
                );
            }, 1000);
        }

        dispatch(updateAssetsSlice(updatedAssets));
    };


    const handleBeneficiaryChecked = (personIndex, assetIndex, isChecked) => {

        const familyBeneficiary = potentialBeneficiaries[personIndex];
        const assetToUpdate = assets[assetIndex];

        // Update the distribution array for the asset
        let updatedDistribution;
        if (isChecked) {
            // Add person to distribution if not already present
            if (!assetToUpdate.distribution.some(d => d.personId._id === familyBeneficiary.personId._id)) {
                updatedDistribution = [
                    ...assetToUpdate.distribution,
                    {
                        personId: {
                            _id: familyBeneficiary.personId._id,
                            title: familyBeneficiary.personId.title,
                            fullLegalName: familyBeneficiary.personId.fullLegalName,
                            fullAddress: familyBeneficiary.personId.fullAddress,
                            dob: familyBeneficiary.personId.dob,
                            email: familyBeneficiary.personId.email || '',
                            tel: familyBeneficiary.personId.tel || ''
                        },
                        receivingAmount: ''
                    }
                ];
            } else {
                updatedDistribution = assetToUpdate.distribution;
            }
        } else {
            updatedDistribution = assetToUpdate.distribution.filter(d => {
                const distPersonId = typeof d.personId === 'object' ? d.personId._id : d.personId;
                return distPersonId !== familyBeneficiary.personId._id;
            });
        }

        // Create the updated asset object
        const updatedAsset = { ...assetToUpdate, distribution: updatedDistribution };

        // Update the assets array
        const updatedAssets = assets.map((asset, index) => index === assetIndex ? updatedAsset : asset);

        // Update the assetsAndDistribution in currentOrder
        const updatedCurrentOrderAssetDistribution = currentOrder.assetsAndDistribution.map(asset => {
            if ((asset.assetId._id === assetToUpdate._id) || (asset._id === assetToUpdate._id)) {
                return {
                    ...asset,
                    distribution: updatedDistribution
                };
            }
            return asset;
        });

        // Update currentOrder with updated assetsAndDistribution
        const updatedCurrentOrder = {
            ...currentOrder,
            assetsAndDistribution: updatedCurrentOrderAssetDistribution,
            peopleAndRoles: currentOrder.peopleAndRoles
        };

        dispatch(updateAssetsSlice(updatedAssets));
        dispatch(updateCurrentOrderSlice(updatedCurrentOrder));
    };


    const handleAdditionalBeneficiaryFormAdd = async (e) => {
        e.preventDefault();

        if (editAdditionalBeneficiaryIndex !== null) {

            const updatedBeneficiaryDetails = additionalBeneficiaryFormData;
            let tempAdditionalBeneficiariesToUpdate = [...additionalBeneficiariesToUpdate];


            const updatedAdditionalBeneficiaries = additionalBeneficiaries.map((beneficiary, index) => {
                if (index === editAdditionalBeneficiaryIndex) {

                    // If the _id does not include "temp", store the update information
                    if (!beneficiary.personId._id.includes("temp")) {
                        tempAdditionalBeneficiariesToUpdate.push({
                            personId: beneficiary.personId._id,
                            updatedDetails: updatedBeneficiaryDetails
                        });
                    }
                    // Return the updated beneficiary
                    return { personId: additionalBeneficiaryFormData };
                }
                return beneficiary;
            });


            // Set the updated beneficiaries to the state after the loop
            setAdditionalBeneficiariesToUpdate(tempAdditionalBeneficiariesToUpdate);
            dispatch(updateAdditionalBeneficiariesSlice(updatedAdditionalBeneficiaries));

            const beneficiaryToUpdate = additionalBeneficiaries[editAdditionalBeneficiaryIndex];


            // Update the beneficiary details in peopleAndRoles in currentOrder
            const updatedPeopleAndRoles = currentOrder.peopleAndRoles.map(role => {
                if (role.personId._id === beneficiaryToUpdate.personId._id) {
                    return {
                        ...role,
                        personId: {
                            ...role.personId,
                            ...updatedBeneficiaryDetails
                        }
                    };
                }
                return role;
            });


            // Update the beneficiary details in distribution for each asset
            const updatedAssets = assets.map(asset => {
                const updatedDistribution = asset.distribution.map(dist => {
                    if (dist.personId._id === beneficiaryToUpdate.personId._id) {
                        return {
                            ...dist,
                            personId: {
                                ...dist.personId,
                                ...updatedBeneficiaryDetails
                            }
                        };
                    }
                    return dist;
                });
                return { ...asset, distribution: updatedDistribution };
            });


            // Update the currentOrder slice
            const updatedCurrentOrder = {
                ...currentOrder,
                peopleAndRoles: updatedPeopleAndRoles,
                assetsAndDistribution: updatedAssets.map(asset => ({
                    assetId: {
                        _id: asset._id,
                        assetType: asset.assetType,
                        bankName: asset.bankName,
                        provider: asset.provider,
                        userId: asset.userId,
                        createdAt: asset.createdAt,
                        updatedAt: asset.updatedAt,
                        __v: asset.__v
                    },
                    distribution: asset.distribution
                }))
            };


            await dispatch(updateCurrentOrderSlice(updatedCurrentOrder));
            await dispatch(updateAssetsSlice(updatedAssets));

            // Reset the form and state
            setEditAdditionalBeneficiaryIndex(null);
            resetAdditionalBeneficiaryForm();
            setShowAdditionalBeneficiaryForm(false);
        }
        else {
            const newBeneficiary = {
                ...additionalBeneficiaryFormData,
                _id: additionalBeneficiaryFormData._id || `temp-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
            };

            const updatedAdditionalBeneficiaries = [...additionalBeneficiaries, { personId: newBeneficiary }];
            await dispatch(updateAdditionalBeneficiariesSlice(updatedAdditionalBeneficiaries));
        }

        resetAdditionalBeneficiaryForm();
        setShowAdditionalBeneficiaryForm(false);
    };


    const handleSaveAndContinue = async (e) => {
        e.preventDefault();

        if (additionalBeneficiariesToRemove.length > 0) {
            additionalBeneficiariesToRemove.forEach((benToRemove) => {
                if (benToRemove && !benToRemove.includes("temp")) {
                    dispatch(deleteAdditionalBeficiaryThunk(benToRemove));
                }
            });
        }

        if (additionalBeneficiariesToUpdate.length > 0) {
            additionalBeneficiariesToUpdate.forEach((benToUpdate) => {
                dispatch(updateAdditionalBeficiaryThunk(benToUpdate.updatedDetails));
            });
        }

        if (additionalBeneficiaries.length > 0) {
            let updatedPeopleAndRoles = [...currentOrder.peopleAndRoles];
            let updatedAssetsSlice = [...assets];
            let updatedAdditionalBeneficiariesSlice = [...additionalBeneficiaries]

            for (const benToStore of additionalBeneficiaries) {
                if (benToStore.personId._id.includes("temp")) {
                    const updatedBenToStoreData = { ...benToStore, role: "additional beneficiary" };
                    const createAddBenResponse = await dispatch(createAdditionalBeficiaryThunk(updatedBenToStoreData.personId));

                    if (createAddBenResponse.payload && createAddBenResponse.payload._id) {
                        const correctId = createAddBenResponse.payload._id;

                        updatedAdditionalBeneficiariesSlice = updatedAdditionalBeneficiariesSlice.map((addBen) => {
                            if (addBen.personId._id === benToStore.personId._id) {
                                return { ...addBen, personId: { ...addBen.personId, _id: correctId } };
                            }
                            return addBen;
                        });

                        await dispatch(updateAdditionalBeneficiariesSlice(updatedAdditionalBeneficiariesSlice));


                        updatedAssetsSlice = updatedAssetsSlice.map((asset) => {
                            const updatedDistribution = asset.distribution.map((dist) => {
                                const distPersonId = typeof dist.personId === 'object' ? dist.personId._id : dist.personId;

                                if (distPersonId === benToStore.personId._id) {
                                    // Replace with the correctId and include all relevant details from benToStore
                                    return {
                                        ...dist,
                                        personId: {
                                            ...benToStore.personId,
                                            _id: correctId,
                                        }
                                    };
                                }
                                return dist;
                            });
                            return { ...asset, distribution: updatedDistribution };
                        });


                        await dispatch(updateAssetsSlice(updatedAssetsSlice));

                        updatedPeopleAndRoles = [
                            ...updatedPeopleAndRoles,
                            {
                                personId: {
                                    ...benToStore.personId,
                                    _id: correctId
                                },
                                role: ['additional beneficiary']
                            }
                        ];

                        await dispatch(updateCurrentOrderSlice({
                            ...currentOrder,
                            peopleAndRoles: updatedPeopleAndRoles,
                            assetsAndDistribution: updatedAssetsSlice.map(asset => ({
                                assetId: {
                                    _id: asset._id,
                                    assetType: asset.assetType,
                                    bankName: asset.bankName,
                                    provider: asset.provider,
                                    userId: asset.userId,
                                    createdAt: asset.createdAt,
                                    updatedAt: asset.updatedAt,
                                    __v: asset.__v
                                },
                                distribution: asset.distribution
                            }))
                        }));
                    }
                }
            }
            try {
                const response = await dispatch(updateOrderThunk({
                    ...currentOrder,
                    peopleAndRoles: updatedPeopleAndRoles,
                    assetsAndDistribution: updatedAssetsSlice.map(asset => ({
                        assetId: {
                            _id: asset._id,
                            assetType: asset.assetType,
                            bankName: asset.bankName,
                            provider: asset.provider,
                            userId: asset.userId,
                            createdAt: asset.createdAt,
                            updatedAt: asset.updatedAt,
                            __v: asset.__v
                        },
                        distribution: asset.distribution
                    }))
                }));
                if (response && response.payload) {
                    dispatch(updateCurrentOrderSlice({
                        ...response.payload,
                        orderId: response.payload._id,
                    }));
                } else {
                    throw new Error('Failed to update order');
                }
            } catch (error) {
                console.error('Failed to update order:', error);
            }
        }

        else {
            await dispatch(updateAssetsSlice(assets));
            await dispatch(updateAdditionalBeneficiariesSlice(additionalBeneficiaries));
            await dispatch(updateCurrentOrderSlice({
                ...currentOrder,
                assetsAndDistribution: assets.map(asset => ({
                    assetId: asset._id || asset.assetId,
                    assetType: asset.assetType,
                    bankName: asset.bankName,
                    provider: asset.provider,
                    otherAssetDetails: asset.otherAssetDetails,
                    distribution: asset.distribution.map(dist => ({
                        personId: dist.personId._id || dist.personId,
                        receivingAmount: dist.receivingAmount,
                        title: dist.personId.title,
                        fullLegalName: dist.personId.fullLegalName,
                        fullAddress: dist.personId.fullAddress,
                        dob: dist.personId.dob,
                        email: dist.personId.email,
                        tel: dist.personId.tel,
                    })),
                }))
            }));

            try {
                const response = await dispatch(updateOrderThunk({
                    ...currentOrder,
                    assetsAndDistribution: assets.map(asset => ({
                        assetId: asset._id || asset.assetId,
                        assetType: asset.assetType,
                        bankName: asset.bankName,
                        provider: asset.provider,
                        otherAssetDetails: asset.otherAssetDetails,
                        distribution: asset.distribution.map(dist => ({
                            personId: dist.personId._id || dist.personId,
                            receivingAmount: dist.receivingAmount,
                            title: dist.personId.title,
                            fullLegalName: dist.personId.fullLegalName,
                            fullAddress: dist.personId.fullAddress,
                            dob: dist.personId.dob,
                            email: dist.personId.email,
                            tel: dist.personId.tel,
                        })),
                    }))
                }));

                if (response && response.payload) {
                    dispatch(updateCurrentOrderSlice({
                        ...response.payload,
                        orderId: response.payload._id,
                    }));
                } else {
                    throw new Error('Failed to update order');
                }
            } catch (error) {
                console.error('Failed to update order:', error);
            }
        }

        navigate('/creatingOrder');
    };


    const handleBack = () => {
        if (savedAdditionalBeneficiariesData.current) {
            dispatch(updateAdditionalBeneficiariesSlice(savedAdditionalBeneficiariesData.current));
        }
        if (savedAssetsData.current) {
            dispatch(updateAssetsSlice(savedAssetsData.current));
        }
        if (savedCurrentOrderData.current) {
            dispatch(updateCurrentOrderSlice(savedCurrentOrderData.current));
        }
        navigate('/creatingOrder');
    };


    const handleOnBenFormChange = (event) => {
        const { name, value } = event.target;
        setAdditionalBeneficiaryFormData({
            ...additionalBeneficiaryFormData,
            [name]: value,
        });
    };


    const handleEditAdditionalBeneficiary = (index) => {

        const beneficiaryToEdit = additionalBeneficiaries[index];
        setAdditionalBeneficiaryFormData({
            _id: beneficiaryToEdit.personId._id || '',
            title: beneficiaryToEdit.personId.title || '',
            fullLegalName: beneficiaryToEdit.personId.fullLegalName || '',
            fullAddress: beneficiaryToEdit.personId.fullAddress || '',
            dob: beneficiaryToEdit.personId.dob ? new Date(beneficiaryToEdit.personId.dob).toISOString().split('T')[0] : '',
            email: beneficiaryToEdit.personId.email || '',
            tel: beneficiaryToEdit.personId.tel || '',
        });
        setEditAdditionalBeneficiaryIndex(index);
        setShowAdditionalBeneficiaryForm(true);
    };


    const handleShowAdditionalBeneficiaryForm = () => {
        setAdditionalBeneficiaryFormData((prevData) => ({
            ...prevData,
        }));
        setShowAdditionalBeneficiaryForm(prevState => !prevState);
    };


    const resetAdditionalBeneficiaryForm = () => {
        setAdditionalBeneficiaryFormData({
            _id: '',
            title: '',
            fullLegalName: '',
            fullAddress: '',
            dob: '',
            email: '',
            tel: '',
            assetId: ''
        });
        setEditAdditionalBeneficiaryIndex(null);
    };


    const handlePlaceSelected = (address) => {
        setAdditionalBeneficiaryFormData((prevData) => ({
            ...prevData,
            fullAddress: address
        }));
    };


    const handleRemoveAdditionalBeneficiary = async (index) => {

        const beneficiaryToDelete = additionalBeneficiaries.find((_, i) => i === index);

        if (!beneficiaryToDelete.personId._id.includes("temp")) {
            setAdditionalBeneficiariesToRemove(prev => [...prev, beneficiaryToDelete.personId._id]);
        }
        const updatedAdditionalBeneficiaries = additionalBeneficiaries.filter((_, i) => i !== index);

        await dispatch(updateAdditionalBeneficiariesSlice(updatedAdditionalBeneficiaries));

        // Remove the beneficiary from peopleAndRoles in currentOrder
        const updatedPeopleAndRoles = currentOrder.peopleAndRoles.filter(role => role.personId._id !== beneficiaryToDelete.personId._id);

        // Remove the beneficiary from distribution in each asset
        const updatedAssets = assets.map(asset => {
            const updatedDistribution = asset.distribution.filter(dist => dist.personId._id !== beneficiaryToDelete.personId._id);
            return { ...asset, distribution: updatedDistribution };
        });

        // Update the currentOrder slice
        const updatedCurrentOrder = {
            ...currentOrder,
            peopleAndRoles: updatedPeopleAndRoles,
            assetsAndDistribution: updatedAssets.map(asset => ({
                assetId: {
                    _id: asset._id,
                    assetType: asset.assetType,
                    bankName: asset.bankName,
                    provider: asset.provider,
                    userId: asset.userId,
                    createdAt: asset.createdAt,
                    updatedAt: asset.updatedAt,
                    __v: asset.__v
                },
                distribution: asset.distribution
            }))
        };

        await dispatch(updateCurrentOrderSlice(updatedCurrentOrder));
        await dispatch(updateAssetsSlice(updatedAssets));
    };


    return (
        <>
            <Container className="mt-5 mb-4 ps-4 pe-4">
                <Row className="mt-3 mb-4 justify-content-center">
                    <Col xs={12} className="mx-auto">
                        <h1 className="auth-header">Assets distribution</h1>
                    </Col>
                </Row>
                <Row className="mt-3 mb-4 justify-content-center">
                    <Col xs={12} className="mx-auto d-flex justify-content-center">
                        <h5>Please select or/and add the people you want to receive the assets and their share.</h5>
                    </Col>
                </Row>
            </Container>

            {!isXs ? (
                <Container>
                    <Row className="justify-content-between">
                        <Col md={5} className="mt-4 " >
                            <Row>
                                <Col>
                                    {additionalBeneficiaries.length > 0 && (
                                        <>
                                            <h4 className="ps-3 mb-3"> Additional beneficiaries</h4>
                                            {additionalBeneficiaries.map((person, personIndex) => {
                                                return (
                                                    <SectionListItem
                                                        key={`person-${person._id || personIndex}`}
                                                        buttonsDisabled={showAdditionalBeneficiaryForm}
                                                        data={{ ...person, role: 'additional beneficiary' }}
                                                        onRemove={() => handleRemoveAdditionalBeneficiary(personIndex)}
                                                        onEdit={() => handleEditAdditionalBeneficiary(personIndex)}
                                                        section="assetDistribution-additionalBeneficiary"
                                                    />
                                                );
                                            })}
                                        </>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button
                                        variant="success"
                                        className="m-3"
                                        onClick={() => handleShowAdditionalBeneficiaryForm()}
                                        style={showAdditionalBeneficiaryForm ? styles.disabledButton : {}}
                                        disabled={showAdditionalBeneficiaryForm}
                                    >
                                        +Add Beneficiary
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="m-2">
                                    {assets.map((asset, assetIndex) => (
                                        <Accordion className="mt-4 ml-3 accordion-custom-border" defaultActiveKey="0" key={`asset-${asset._id || assetIndex}`}>
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>
                                                    <Container>
                                                        <Row>
                                                            <Col className="flex-grow-1">
                                                                <Row>
                                                                    <Col>
                                                                        <p className="order-item-p"><span className="order-item-p-span">
                                                                            Asset:  </span>{asset.assetType}</p>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col>
                                                                        {asset.assetType === 'Property' &&
                                                                            <p className="order-item-p"><span className="order-item-p-span">
                                                                                Address:  </span>{asset.propertyAddress}</p>}
                                                                        {asset.assetType === 'Bank Account' &&
                                                                            <p className="order-item-p"><span className="order-item-p-span">
                                                                                Bank Name:  </span>{asset.bankName}</p>}
                                                                        {asset.assetType === 'Stocks and shares' &&
                                                                            <p className="order-item-p"><span className="order-item-p-span">
                                                                                Company Name:  </span>{asset.companyName}</p>}
                                                                        {(asset.assetType === 'Pension' || asset.assetType === 'Life insurance') &&
                                                                            <p className="order-item-p"><span className="order-item-p-span">
                                                                                Provider:  </span>{asset.provider}</p>}
                                                                        {asset.assetType === 'Other' &&
                                                                            <p className="order-item-p"><span className="order-item-p-span">
                                                                                Details:  </span>{asset.otherAssetDetails}</p>}
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col className="d-flex justify-content-end col-auto">
                                                                <InputGroup className="total-amount-form-control">
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={totalPercentage[assetIndex] || 0}
                                                                        disabled
                                                                    />
                                                                    <InputGroup.Text>%</InputGroup.Text>
                                                                </InputGroup>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    {potentialBeneficiaries.map((person, personIndex) => (
                                                        <SectionListItem
                                                            key={`asset-${assetIndex}-person-${person.personId._id || personIndex}`}
                                                            buttonsDisabled={showAdditionalBeneficiaryForm}
                                                            data={person.personId}
                                                            onRemove={() => handleRemoveAdditionalBeneficiary(personIndex)}
                                                            onEdit={() => handleEditAdditionalBeneficiary(personIndex)}
                                                            onChecked={(isChecked) => handleBeneficiaryChecked(personIndex, assetIndex, isChecked)}
                                                            section="assetDistribution-beneficiary"
                                                            asset={asset}
                                                            onChange={handleOnChange}
                                                            assetIndex={assetIndex}
                                                        />
                                                    ))}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    ))}
                                </Col>
                            </Row>
                        </Col>
                        <Col md={4} className="pt-4 order-1 order-md-0">
                            {showAdditionalBeneficiaryForm && (
                                <Row>
                                    <Col >
                                        <Form onSubmit={handleAdditionalBeneficiaryFormAdd}>
                                            <Form.Group className="mb-3" controlId="formGroupTitle">
                                                <Form.Label className="bold-label">Title</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    name="title"
                                                    value={additionalBeneficiaryFormData.title}
                                                    onChange={handleOnBenFormChange}
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
                                                    value={additionalBeneficiaryFormData.fullLegalName}
                                                    onChange={handleOnBenFormChange}
                                                    required
                                                    className="custom-input"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formGroupFullAddress">
                                                <Form.Label className="bold-label">Full address</Form.Label>
                                                <AddressAutocomplete
                                                    name="fullAddress"
                                                    value={additionalBeneficiaryFormData.fullAddress}
                                                    onPlaceSelected={handlePlaceSelected}
                                                    handleInputChange={handleOnBenFormChange}
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formGroupDob">
                                                <Form.Label className="bold-label">Date of birth</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="dob"
                                                    value={additionalBeneficiaryFormData.dob}
                                                    onChange={handleOnBenFormChange}
                                                    required
                                                    className="custom-input"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                                <Form.Label className="bold-label">Email (optional)</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={additionalBeneficiaryFormData.email}
                                                    onChange={handleOnBenFormChange}
                                                    className="custom-input"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formGroupPhone">
                                                <Form.Label className="bold-label">Phone Number (optional)</Form.Label>
                                                <Form.Control
                                                    type="tel"
                                                    name="tel"
                                                    value={additionalBeneficiaryFormData.tel}
                                                    onChange={handleOnBenFormChange}
                                                    className="custom-input"
                                                />
                                            </Form.Group>
                                            <Row>
                                                <Col>
                                                    <Button
                                                        variant="primary"
                                                        className="m-1 add-edit-form-btn"
                                                        type="button"
                                                        onClick={() => {
                                                            handleShowAdditionalBeneficiaryForm();
                                                            resetAdditionalBeneficiaryForm();
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
                                                        {editAdditionalBeneficiaryIndex !== null ? "Update" : "Add"}
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Col>
                                </Row>
                            )}
                        </Col>
                    </Row>
                    <>
                        <CreatingOrderNavigation
                            onBack={handleBack}
                            onSaveAndContinue={handleSaveAndContinue}
                            buttonsDisabled={showAdditionalBeneficiaryForm}
                        />
                    </>
                </Container >
            ) : (
                <Container>
                    <Row className="justify-content-between">
                        <Col md={5} className="mt-4 " >
                            <Row>
                                <Col>
                                    {additionalBeneficiaries.length > 0 && (
                                        <>
                                            <h4 className="ps-3 mb-3"> Additional beneficiaries</h4>
                                            {additionalBeneficiaries.map((person, personIndex) => (
                                                <SectionListItem
                                                    key={`person-${person._id || personIndex}`}
                                                    buttonsDisabled={showAdditionalBeneficiaryForm}
                                                    data={{ ...person, role: 'additional beneficiary' }}
                                                    onRemove={() => handleRemoveAdditionalBeneficiary(personIndex)}
                                                    onEdit={() => handleEditAdditionalBeneficiary(personIndex)}
                                                    section="assetDistribution-additionalBeneficiary"
                                                />
                                            ))}
                                        </>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button
                                        variant="success"
                                        className="m-3"
                                        onClick={() => handleShowAdditionalBeneficiaryForm()}
                                        style={showAdditionalBeneficiaryForm ? styles.disabledButton : {}}
                                        disabled={showAdditionalBeneficiaryForm}
                                    >
                                        +Add Beneficiary
                                    </Button>
                                </Col>
                                <Col md={4} className="pt-4 order-1 order-md-0">
                                    {showAdditionalBeneficiaryForm && (
                                        <Row>
                                            <Col >
                                                <Form onSubmit={handleAdditionalBeneficiaryFormAdd}>
                                                    <Form.Group className="mb-3" controlId="formGroupTitle">
                                                        <Form.Label className="bold-label">Title</Form.Label>
                                                        <Form.Control
                                                            as="select"
                                                            name="title"
                                                            value={additionalBeneficiaryFormData.title}
                                                            onChange={handleOnBenFormChange}
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
                                                            value={additionalBeneficiaryFormData.fullLegalName}
                                                            onChange={handleOnBenFormChange}
                                                            required
                                                            className="custom-input"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupFullAddress">
                                                        <Form.Label className="bold-label">Full address</Form.Label>
                                                        <AddressAutocomplete
                                                            name="fullAddress"
                                                            value={additionalBeneficiaryFormData.fullAddress}
                                                            onPlaceSelected={handlePlaceSelected}
                                                            handleInputChange={handleOnBenFormChange}
                                                            required
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupDob">
                                                        <Form.Label className="bold-label">Date of birth</Form.Label>
                                                        <Form.Control
                                                            type="date"
                                                            name="dob"
                                                            value={additionalBeneficiaryFormData.dob}
                                                            onChange={handleOnBenFormChange}
                                                            required
                                                            className="custom-input"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label className="bold-label">Email (optional)</Form.Label>
                                                        <Form.Control
                                                            type="email"
                                                            name="email"
                                                            value={additionalBeneficiaryFormData.email}
                                                            onChange={handleOnBenFormChange}
                                                            className="custom-input"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupPhone">
                                                        <Form.Label className="bold-label">Phone Number (optional)</Form.Label>
                                                        <Form.Control
                                                            type="tel"
                                                            name="tel"
                                                            value={additionalBeneficiaryFormData.tel}
                                                            onChange={handleOnBenFormChange}
                                                            className="custom-input"
                                                        />
                                                    </Form.Group>
                                                    <Row>
                                                        <Col>
                                                            <Button
                                                                variant="primary"
                                                                className="m-1 add-edit-form-btn"
                                                                type="button"
                                                                onClick={() => {
                                                                    handleShowAdditionalBeneficiaryForm();
                                                                    resetAdditionalBeneficiaryForm();
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
                                                                {editAdditionalBeneficiaryIndex !== null ? "Update" : "Add"}
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col className="m-2">
                                    {assets.map((asset, assetIndex) => (
                                        <Accordion className="mt-4 ml-3 accordion-custom-border" defaultActiveKey="0" key={`asset-${asset._id || assetIndex}`}>
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>
                                                    <Container>
                                                        <Row>
                                                            <Col className="flex-grow-1">
                                                                <Row>
                                                                    <Col>
                                                                        <p className="order-item-p"><span className="order-item-p-span">
                                                                            Asset:  </span>{asset.assetType}</p>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col>
                                                                        {asset.assetType === 'Property' &&
                                                                            <p className="order-item-p"><span className="order-item-p-span">
                                                                                Address:  </span>{asset.propertyAddress}</p>}
                                                                        {asset.assetType === 'Bank Account' &&
                                                                            <p className="order-item-p"><span className="order-item-p-span">
                                                                                Bank Name:  </span>{asset.bankName}</p>}
                                                                        {asset.assetType === 'Stocks and shares' &&
                                                                            <p className="order-item-p"><span className="order-item-p-span">
                                                                                Company Name:  </span>{asset.companyName}</p>}
                                                                        {(asset.assetType === 'Pension' || asset.assetType === 'Life insurance') &&
                                                                            <p className="order-item-p"><span className="order-item-p-span">
                                                                                Provider:  </span>{asset.provider}</p>}
                                                                        {asset.assetType === 'Other' &&
                                                                            <p className="order-item-p"><span className="order-item-p-span">
                                                                                Details:  </span>{asset.otherAssetDetails}</p>}
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col className="d-flex justify-content-end col-auto">
                                                                <InputGroup className="total-amount-form-control">
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={totalPercentage[assetIndex] || 0}
                                                                        disabled
                                                                    />
                                                                    <InputGroup.Text>%</InputGroup.Text>
                                                                </InputGroup>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    {potentialBeneficiaries.map((person, personIndex) => (
                                                        <SectionListItem
                                                            key={`asset-${assetIndex}-person-${personIndex}`}
                                                            buttonsDisabled={showAdditionalBeneficiaryForm}
                                                            data={person.personId}
                                                            onRemove={() => handleRemoveAdditionalBeneficiary(personIndex)}
                                                            onEdit={() => handleEditAdditionalBeneficiary(personIndex)}
                                                            onChecked={(isChecked) => handleBeneficiaryChecked(personIndex, assetIndex, isChecked)}
                                                            section="assetDistribution-beneficiary"
                                                            asset={asset}
                                                            onChange={handleOnChange}
                                                            assetIndex={assetIndex}
                                                        />
                                                    ))}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    ))}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <>
                        <CreatingOrderNavigation
                            onBack={handleBack}
                            onSaveAndContinue={handleSaveAndContinue}
                            buttonsDisabled={showAdditionalBeneficiaryForm}
                        />
                    </>
                </Container >
            )}
            <ToastContainer
                className="custom-toast"
                position="top-center"
                autoClose={4000} />
        </>
    );
}


export default AssetsDistribution;


import { resetCurrentOrderSlice } from "../features/currentOrder/currentOrderSlice"
import { resetAssetsSlice } from "../features/orderAssets/orderAssetsSlice"
import { resetAdditionalBeneficiariesSlice } from "../features/people/additionalBeneficiaries/additionalBeneficiariesSlice"
import { resetKidsSlice } from "../features/people/kids/kidsSlice"
import { resetSpouseOrPartnerSlice } from "../features/people/spouseOrPartner/spouseOrPartnerSlice"
import { resetTestatorSlice } from "../features/people/testator/testatorSlice"
import { resetAdditionalExecutorsSlice } from "../features/people/additionalExecutors/additionalExecutorsSlice"


export const resetOrderState = async (dispatch) =>{
    await dispatch(resetCurrentOrderSlice())
    await dispatch(resetTestatorSlice())
    await dispatch(resetSpouseOrPartnerSlice())
    await dispatch(resetKidsSlice())
    await dispatch(resetAdditionalBeneficiariesSlice())
    await dispatch(resetAdditionalExecutorsSlice())
    await dispatch(resetAssetsSlice())
    await dispatch(resetAdditionalBeneficiariesSlice())
}
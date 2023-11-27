import { PaginationAction, PaginationActionType, paginationStore } from "../Redux/paginationState";

class PaginationService {
    public updatePageNumber(pageNumber: number) {
        let currentPageNumber = paginationStore.getState().currentPage;

        if (currentPageNumber !== 1) {
            const action: PaginationAction = { type: PaginationActionType.SetCurrentPage, payload: pageNumber}
            paginationStore.dispatch(action)
        }

        return currentPageNumber
    }
}

const paginationService = new PaginationService()
export default paginationService;
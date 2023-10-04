import { useState } from 'react'
import VacationModel from "../Models/vacationModel"

export default function useModal() {
    const [showModal, setShowModal] = useState(false)

    function toggleModal() {
        setShowModal(!showModal)
    }

    const [modalVacation, setModalVacation] = useState<VacationModel>()

    function initModal(vacationData: VacationModel) {
        setModalVacation(vacationData)
        toggleModal()
    }

    return { showModal, toggleModal, modalVacation, initModal }
}
import React from 'react';
import { DisplayText, Modal, ScrollView } from '../../components';
import { useStateValue } from '../../components/state-provider';
import { types } from '../../utils';
const ContactModal = ({
    open,
    onClose
}) => {

    const [{appLanguage}] = useStateValue();

    return (
        <Modal
            open={open}
            onClose={onClose}
            bottomAlign
            className="contact-modal"
        >
            <div className="content">
                <ScrollView>
                    <DisplayText size="large">{types[appLanguage].contact.title}</DisplayText>
                    <DisplayText size="medium">{types[appLanguage].contact.description}</DisplayText>
                    <DisplayText size="small">
                        <a href="mailto:jmiguel.gonzalez221093@gmail.com">{types[appLanguage].contact.email}</a>
                    </DisplayText>
                </ScrollView>
            </div>
        </Modal>
    )
}
export default ContactModal;
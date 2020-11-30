import React from 'react';
import { DisplayText, Modal, ScrollView } from '../../components';
import { useStateValue } from '../../components/state-provider';
import { types } from '../../utils';
const AboutModal = ({
    open,
    onClose
}) => {

    const [{appLanguage}] = useStateValue();

    return (
        <Modal
            open={open}
            onClose={onClose}
            bottomAlign
            className="about-modal"
        >
            <div className="content text-center">
                <ScrollView>
                    <DisplayText
                        size="large"
                    >
                        {types[appLanguage].about.title}
                    </DisplayText>
                    <p dangerouslySetInnerHTML={{__html: types[appLanguage].about.p1}}></p>
                    <p dangerouslySetInnerHTML={{__html: types[appLanguage].about.p2}}></p>
                    <p dangerouslySetInnerHTML={{__html: types[appLanguage].about.p3}}></p>
                    <p dangerouslySetInnerHTML={{__html: types[appLanguage].about.p4}}></p>
                    <p dangerouslySetInnerHTML={{__html: types[appLanguage].about.p5}}></p>
                    <p dangerouslySetInnerHTML={{__html: types[appLanguage].about.p6}}></p>
                </ScrollView>
            </div>
        </Modal>
    )
}
export default AboutModal;
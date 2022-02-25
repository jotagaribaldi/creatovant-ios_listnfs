import { db } from '../../firebase-conf';

import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';



const leiturasCollectionRef = collection(db, "leituras")
class LeiturasDataService {
    addLeitura = ( newLeitura ) => {
        return addDoc(leiturasCollectionRef, newLeitura);
    }

    updateLeitura = (id, updatedLeitura) => {
        const leituraDoc = doc(db, "leituras", id);
        return updateDoc(leituraDoc, updatedLeitura);
    }

    deleteLeitura = (id) => {
        const leituradDoc = doc(db, "leituras", id);
        return deleteDoc(leituradDoc);
    }

    getAllLeituras = () => {
      //  return getDocs(leiturasCollectionRef)
       return getDocs(query(leiturasCollectionRef,  orderBy('readedAt')))
    }

    getLeitura = (id) => {
        const leituralDoc = doc(db, "leituras", id);
        return getDoc(leituralDoc);
    }
}


export default new LeiturasDataService();
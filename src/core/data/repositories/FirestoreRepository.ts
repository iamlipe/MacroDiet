import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { removeUndefined } from '@utils/helpers/help';

export class FirestoreRepository {
  private db: FirebaseFirestoreTypes.Module;

  constructor() {
    this.db = firestore();
  }

  async getMany(
    collection: string,
    query?: (ref: FirebaseFirestoreTypes.Query) => FirebaseFirestoreTypes.Query,
  ) {
    const collectionRef = this.db.collection(collection);
    const queryRef = query ? query(collectionRef) : collectionRef;
    const querySnapshot = await queryRef.get();

    if (!querySnapshot.empty) {
      const documents = querySnapshot.docs.map(doc => {
        return { doc: doc.id, ...doc.data() };
      });

      return documents;
    }

    return [];
  }

  async get(collection: string, doc: string) {
    const document = await this.db.collection(collection).doc(doc).get();

    if (document.exists) {
      return { doc: document.id, ...document.data() };
    }

    return undefined;
  }

  async set(collection: string, doc: string, data: Record<string, any>) {
    await this.db.collection(collection).doc(doc).set(removeUndefined(data));
  }

  async add(collection: string, data: Record<string, any>) {
    const newData = await this.db
      .collection(collection)
      .add(removeUndefined(data));

    return newData.id;
  }

  async setMany(collection: string, data: Record<string, any>[]) {
    const batch = this.db.batch();

    data.forEach(docData => {
      const docRef = this.db.collection(collection).doc();
      batch.set(docRef, docData);
    });

    await batch.commit();
  }

  async update(
    collection: string,
    doc: string,
    updates: Partial<Record<string, any>>,
  ) {
    await this.db.collection(collection).doc(doc).update(updates);
  }

  async remove(collection: string, doc: string) {
    await this.db.collection(collection).doc(doc).delete();
  }
}

import { parseCertificate } from 'vault/helpers/parse-pki-cert';
import ApplicationSerializer from '../../application';

export default class PkiCertificateGenerateSerializer extends ApplicationSerializer {
  primaryKey = 'serial_number';
  attrs = {
    role: { serialize: false },
  };

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (requestType === 'createRecord' && payload.data.certificate) {
      // Parse certificate back from the API and add to payload
      const parsedCert = parseCertificate(payload.data.certificate);
      const json = super.normalizeResponse(
        store,
        primaryModelClass,
        { ...payload, ...parsedCert },
        id,
        requestType
      );
      return json;
    }
    return super.normalizeResponse(...arguments);
  }
}

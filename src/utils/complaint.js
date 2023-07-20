import { ComplaintService } from '~/services';

export const create = async (complaint) => {
  const data = {
    cnp: complaint.cnp,
    lat: complaint.lat,
    lng: complaint.lng,
    name: complaint.name,
    type: complaint.type,
    victim: complaint.victim,
    reason: complaint.reason,
    details: complaint.details,
    uploads: complaint.uploads,
    signature: complaint.signature,
    proof_type: complaint.proofType,
    id_card_upload: complaint.idCardUpload,
    location_id: complaint.location?.id || null,
    location_name: complaint.location?.name || null,
    location_to_id: complaint.locationTo?.id || null,
    location_to_name: complaint.locationTo?.name || null,
    location_to_type: complaint.locationToType,
  };

  return await ComplaintService.create(data);
};

import { ComplaintService } from '~/services';

export const create = async (complaint) => {
  const data = {
    name: complaint.name,
    type: complaint.type,
    victim: complaint.victim,
    reason: complaint.reason,
    details: complaint.details,
    uploads: complaint.uploads,
    proof_type: complaint.proofType,
    location_id: complaint.location?.id || null,
    location_name: complaint.location?.name || null,
    location_to_id: complaint.locationTo?.id || null,
    location_to_name: complaint.locationTo?.name || null,
    location_to_type: complaint.locationToType,
  };

  return await ComplaintService.create(data);
};

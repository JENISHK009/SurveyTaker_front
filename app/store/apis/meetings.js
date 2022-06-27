/* eslint-disable arrow-body-style */
import restApiClient from './index';
import resHandler from '../../utils/resHandler';

export const fetchMeetings = async data => {
  try {
    let datas;
    if (data) {
      datas = await restApiClient.get(`/meetings?folderId=${data}`);
    } else {
      datas = await restApiClient.get(`/meetings`);
    }

    return resHandler(datas, null);
  } catch (error) {
    return resHandler(error, true);
  }
};

export const fetchFutureMeetings = async () => {
  try {
    const datas = await restApiClient.get(`/meetings?isFuture=true`);
    return resHandler(datas, null);
  } catch (error) {
    return resHandler(error, true);
  }
};

export const fetchTemplates = async () => {
  try {
    const datas = await restApiClient.get(`/template/list`);
    return resHandler(datas, null);
  } catch (error) {
    return resHandler(error, true);
  }
};

export const fetchLnaguages = async () => {
  try {
    const datas = await restApiClient.get(`/ms/languages`);
    return resHandler(datas, null);
  } catch (error) {
    return resHandler(error, true);
  }
};

export const fetchMeetingAccess = async () => {
  try {
    const datas = await restApiClient.get(`/ms/meeting-access`);
    return resHandler(datas, null);
  } catch (error) {
    return resHandler(error, true);
  }
};

export const fetchMeetingAudioConfig = async () => {
  try {
    const datas = await restApiClient.get(`/ms/audio-config`);
    return resHandler(datas, null);
  } catch (error) {
    return resHandler(error, true);
  }
};

export const createMeeting = async meetingInfo => {
  try {
    const datas = await restApiClient.post(`/meetings`, meetingInfo);
    return resHandler(datas, null);
  } catch (error) {
    return resHandler(error, true);
  }
};

export const fetchParticipants = async id => {
  try {
    const datas = await restApiClient.get(
      `/meetings/participants?meeting_id=${id}`,
    );
    return resHandler(datas, null);
  } catch (error) {
    return resHandler(error, true);
  }
};

export const addParticipants = async addData => {
  try {
    const data = await restApiClient.post(`/meetings/participants`, addData);
    return resHandler(data, null);
  } catch (error) {
    return resHandler(error, true);
  }
};

export const removeParticipants = async removeId => {
  try {
    const datas = await restApiClient.delete(
      `/meetings/RemoveParticipants?id=${removeId}`,
    );
    return resHandler(datas, null);
  } catch (error) {
    return resHandler(error, true);
  }
};

export const postEmail = async emailInfo => {
  try {
    const datas = await restApiClient.post(`/meetings/email`, emailInfo);
    return resHandler(datas, null);
  } catch (error) {
    return resHandler(error, true);
  }
};

export const fetchEmails = async id => {
  try {
    const datas = await restApiClient.get(`/meetings/email`, {
      params: {
        meeting_id: id,
      },
    });
    return resHandler(datas, null);
  } catch (error) {
    return resHandler(error, true);
  }
};

export const deleteEmail = async id => {
  try {
    const datas = await restApiClient.delete(`/ms/deleteEmail`, {
      data: {
        id,
      },
    });
    return resHandler(datas, null);
  } catch (error) {
    return resHandler(error, true);
  }
};

export const deleteMeeting = ({ meetingId, folderId }) => {
  return restApiClient.delete(`/meetings/deleteMeetings`, {
    data: {
      meetingId,
      folderId,
    },
  });
};

export const createMeetingFolder = async folderName => {
  try {
    const datas = await restApiClient.post(
      `/meetings/createFolder`,
      folderName,
    );
    return resHandler(datas, null);
  } catch (error) {
    return resHandler(error, true);
  }
};

export const fetchMeetingsFolder = async data => {
  try {
    let datas;
    if (data) {
      datas = await restApiClient.get(
        `/meetings/getAllFolder?isMeetingList=${data}`,
      );
    } else {
      datas = await restApiClient.get(`/meetings/getAllFolder`);
    }
    return resHandler(datas, null);
  } catch (error) {
    return resHandler(error, true);
  }
};

export const moveMeetingFolder = async data => {
  try {
    const datas = await restApiClient.post(
      `/meetings/addMeetingInFolder`,
      data,
    );
    return resHandler(datas, null);
  } catch (error) {
    return resHandler(error, true);
  }
};
export const getReportsForMeeting = async meetingId => {
  try {
    const datas = await restApiClient.get(
      `reports/getSessionReport?meeting_id=${meetingId}`,
    );
    return resHandler(datas, null);
  } catch (error) {
    return resHandler(error, true);
  }
};

export const removeTemplate = async removeId => {
  try {
    const datas = await restApiClient.delete(
      `/template/deleteTemplate?id=${removeId}`,
    );
    return resHandler(datas, null);
  } catch (error) {
    return resHandler(error, true);
  }
};

export const getSessionReport = async meetingId => {
  try {
    const datas = await restApiClient.get(
      `reports/getSessionReportAllData?meeting_id=${meetingId}`,
    );
    return resHandler(datas, null);
  } catch (error) {
    return resHandler(error, true);
  }
};

import { createSlice } from '@reduxjs/toolkit';

import type { DesktopVersion, VersionInfo } from '../../utils/updates/type';
import type { PayloadAction } from '@reduxjs/toolkit';

export type UpdateError = {
  error: Error;
};

export interface DataDE {
  checkUpdates: number;
  appDownloadAddress: string;
}

const initialState: DataDE = {
  checkUpdates: 0,
  appDownloadAddress: '--',
};

export const autoUpdaterSlice = createSlice({
  name: 'dataDE',
  initialState,
  reducers: {
    setCheckUpdates(state) {
      state.checkUpdates += 1;
    },
    setAppDownloadAddress(state, action) {
      state.appDownloadAddress = action.payload;
    },
  },
});

export const { setCheckUpdates, setAppDownloadAddress } =
  autoUpdaterSlice.actions;

export default autoUpdaterSlice.reducer;

/*
 * Copyright 2024 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const API_KEY =
  globalThis.GOOGLE_MAPS_API_KEY ?? (import.meta.env.VITE_GOOGLE_MAPS_API_KEY!);

const App = () => (
  <APIProvider
    solutionChannel='GMP_devsite_samples_v3_rgmbasicmap'
    apiKey={API_KEY}>
    <Map
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    />
  </APIProvider>
);
const root = createRoot(document.getElementById('app')!);
root.render(<App />);

export default App;

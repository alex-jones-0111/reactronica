import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import StartAudioContext from 'startaudiocontext';

import Tone from '../lib/tone';

export const SongContext = React.createContext();

const Song = ({
  isPlaying = false,
  tempo = 90,
  // subdivision= '4n',
  swing = 0,
  swingSubdivision = '8n',
  volume = 0,
  isMuted = false,
  children,
}) => {
  useEffect(() => {
    Tone.Transport.bpm.value = tempo;
    Tone.Transport.swing = swing;
    Tone.Transport.swingSubdivision = swingSubdivision;
  }, [tempo, swing, swingSubdivision]);

  useEffect(() => {
    if (isPlaying) {
      // Hack to get Tone to NOT use same settings from another instance
      Tone.Transport.bpm.value = tempo;
      Tone.Transport.swing = swing;
      Tone.Transport.swingSubdivision = swingSubdivision;

      Tone.Transport.start();

      // iOS Web Audio API requires this library.
      StartAudioContext(Tone.context);
    } else {
      Tone.Transport.stop();
    }
  }, [isPlaying]);

  useEffect(() => {
    Tone.Master.volume.value = volume;
  }, [volume]);

  useEffect(() => {
    Tone.Master.mute = isMuted;
  }, [isMuted]);

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <SongContext.Provider
      value={{
        isPlaying,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

Song.propTypes = {
  isPlaying: PropTypes.bool,
  tempo: PropTypes.number,
  swing: PropTypes.number,
  swingSubdivision: PropTypes.oneOf(['8n']),
  children: PropTypes.node,
};

export default Song;

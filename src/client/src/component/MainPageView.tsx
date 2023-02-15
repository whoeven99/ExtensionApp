import './style.css';
import React from 'react';
import { Separator, Stack } from '@fluentui/react';
import { LanguageSelection } from './LanguageSelection';
import { demoInput, demoPendingRewording } from '../data/demo';
import { PasteTextView } from './PasteTextView';
import { ReviewRephraseView } from './ReviewRephraseView';
import { ReviewTranslationTabView } from './ReviewTranslationTabView';
import { languageOptions } from '../data/languages';

export const MainPageView: React.FC = () => {
  const [showLangSelection, setShowLangSelection] = React.useState(false);
  const [showTranslationTab, setShowTranslationTab] = React.useState(false);

  const [sourceLangId, setSourceLangId] = React.useState('en');
  const [targetLangIds, setTargetLangIds] = React.useState<string[]>([]);

  const confirmRephrasing = () => {
    // remove sourceLangeId from targetLangIds
    setTargetLangIds(targetLangIds.filter((id) => id !== sourceLangId));
    setShowLangSelection(true);
  };

  const twoColJsx = (
    <Stack horizontal className='editor' tokens={{ childrenGap: 10 }}>
      <Stack.Item className='editor__input'>
        <PasteTextView
          disabled={showLangSelection}
          sourceLangId={sourceLangId}
          setSourceLangId={setSourceLangId} />
      </Stack.Item>
      <Separator vertical />
      <Stack.Item className='editor__input'>
        <ReviewRephraseView
          disabled={showLangSelection}
          original={demoInput}
          rephrased={demoPendingRewording}
          startTranslation={confirmRephrasing}
        />
      </Stack.Item>
    </Stack>
  );

  const selectedLanguages = languageOptions
    .filter((language) => targetLangIds.includes(language.key));

  const reviewSectionJsx = (showTranslationTab &&
      <ReviewTranslationTabView selectedLanguages={selectedLanguages} />
  );

  return (
    <Stack tokens={{ childrenGap: 40 }} className='editorWrapper'>
      {twoColJsx}

      { showLangSelection && (
        <LanguageSelection
          disabled={showTranslationTab}
          sourceLangId={sourceLangId}
          targetLangIds={targetLangIds}
          setTargetLangIds={setTargetLangIds}
          confirmLanguages={() => { setShowTranslationTab(true); }}
        />
      )}

      {reviewSectionJsx}
    </Stack>
  );
};

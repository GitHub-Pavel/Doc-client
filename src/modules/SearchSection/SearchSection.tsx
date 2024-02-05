import classNames from 'classnames';
import { FC } from 'react';
import { Container, Input, Section } from 'ui';
import styles from './SearchSection.module.scss';
import { useSearch } from './search-section.hooks';

type SearchSectionProps = {
  cacheTag: string;
};

export const SearchSection: FC<SearchSectionProps> = ({ cacheTag }) => {
  const { register, onSubmit, hasSerachParam, value, isValid } =
    useSearch(cacheTag);
  const btnClasses = classNames(styles.btn, {
    'fui-search': !hasSerachParam,
    'fui-cross': hasSerachParam,
  });
  return (
    <Section>
      <Container>
        <form className={styles.form} onSubmit={onSubmit}>
          <Input
            size="hg"
            type="text"
            variant="primary"
            autoComplete="off"
            defaultValue={value!}
            placeholder="Search..."
            readonly={hasSerachParam}
            {...register('search', { required: true })}
          />
          {isValid && <button type="submit" className={btnClasses} />}
        </form>
      </Container>
    </Section>
  );
};

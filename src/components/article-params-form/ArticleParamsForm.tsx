// ArticleParamsForm.tsx
import { useState, useRef, SyntheticEvent } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useClose } from 'src/components/hooks/useClose';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

export type StateArcticleParamsForm = 'open' | 'close';

export type ArticleParamsFormProps = {
	onChange: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onChange }: ArticleParamsFormProps) => {
	const asideRef = useRef<HTMLDivElement | null>(null);

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

	useClose({
		isOpen: isOpenMenu,
		onClose: () => setIsOpenMenu(false),
		rootRef: asideRef,
	});

	const toggleStateMenu = () => {
		setIsOpenMenu((prev) => !prev);
	};

	const handleOptionChange = (
		key: keyof ArticleStateType,
		option: OptionType
	) => {
		setFormState((prevState) => ({
			...prevState,
			[key]: option,
		}));
	};

	const handleOnSubmitForm = (e: SyntheticEvent) => {
		e.preventDefault();
		onChange(formState);
	};

	const handleOnClickButtonReset = () => {
		setFormState(defaultArticleState);
		onChange(defaultArticleState);
	};

	return (
		<div ref={asideRef}>
			<ArrowButton onClick={toggleStateMenu} isOpenMenu={isOpenMenu} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpenMenu,
				})}>
				<form className={styles.form} onSubmit={handleOnSubmitForm}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(option) =>
							handleOptionChange('fontFamilyOption', option)
						}
						title='шрифт'
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) => handleOptionChange('fontSizeOption', option)}
						title='размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option) => handleOptionChange('fontColor', option)}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option) => handleOptionChange('backgroundColor', option)}
						title='цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option) => handleOptionChange('contentWidth', option)}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleOnClickButtonReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};

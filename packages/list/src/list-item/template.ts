import { IProps } from '.';

const bodyGenerator = {
  text(props: IProps) {
    const body = `${props.content ?? ''}`;
    return {
      body,
    };
  },
  operations(props: IProps) {
    const { operations, content, title, desc, avatar } = props;

    const Avatar = avatar ? `<img class="avatar" src="${avatar}" />` : '';
    const Title = title ? `<div class="bold">${title}</div>` : '';
    const Desc = desc ? `<div>${desc}</div>` : '';
    const Content = content ? `<div class="content">${content}</div>` : '';

    const body = `
    <div class="info flex-row">
       ${Avatar}
      <div class="flex-column">
        ${Title}
        ${Desc}
      </div>
    </div>

    ${Content}

    <div class="operations">${operations}</div>
    `;

    return {
      body,
      extendsClassName: 'flex-row align-items-center',
    };
  },
};

export default function createTemplate(props: IProps) {
  const { type } = props;
  const className = 'list-item-' + type;

  const {
    body = '',
    extendsClassName,
    extendsStyles,
  } = (type && bodyGenerator[type] && bodyGenerator[type](props)) || {};

  const template = `
  <div class="rm-list-container ${className} ${extendsClassName}" style="${extendsStyles}">
    ${body}
  </div>
  `;

  return template;
}

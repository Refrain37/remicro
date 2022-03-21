import { IProps } from '.';

interface IContent {
  body: string;
  extendsClassName?: string;
  extendsStyles?: string;
}

const bodyGenerator = {
  text(props: IProps): IContent {
    const body = `${props.content ?? ''}`;
    return {
      body,
    };
  },
  base(props: IProps): IContent {
    const { content, title, desc, avatar } = props;

    const Avatar = avatar
      ? `<div class="avatar">
      <img src="${avatar}" />
    </div>`
      : '';
    const Title = title ? `<div class="bold">${title}</div>` : '';
    const Desc = desc ? `<div class="mt5 color-9">${desc}</div>` : '';
    const Content = content
      ? `<div class="flex-1 fontsize-16 ml20 mr20">${content}</div>`
      : '';

    const body = `
    <div class="info flex-row fontsize-16">
       ${Avatar}
      <div class="flex-column ml10">
        ${Title}
        ${Desc}
      </div>
    </div>

    ${Content}
    `;

    return {
      body,
      extendsClassName: 'flex-row align-items-center',
    };
  },
  card(props: IProps): IContent {
    const { operations, content, title, desc, avatar, cover } = props;

    const Avatar = avatar
      ? `<div class="avatar mr10">
          <img src="${avatar}" />
        </div>`
      : '';
    const Title = title ? `<div class="bold">${title}</div>` : '';
    const Desc = desc ? `<div class="mt5 color-9">${desc}</div>` : '';
    const Content = content ? `<div class="mt20">${content}</div>` : '';
    const Operations = title ? `<div class="mt20">${operations}</div>` : '';

    const Cover = cover
      ? `<div class="cover ml40">
        <img src="${cover}" />
      </div>`
      : '';

    const body = `
  <div class="info flex-1 flex-column fontsize-16">
    <div class="flex-row">
      ${Avatar}
      <div class="flex-column">
        ${Title}
        ${Desc}
      </div>
    </div>

    ${Content}
    ${Operations}
  </div>

  ${Cover}
  `;

    return {
      body,
      extendsClassName:
        'flex-row align-items-center justify-content-space-between',
    };
  },
  operations(props: IProps): IContent {
    const { operations, content, title, desc, avatar } = props;

    const Avatar = avatar
      ? `<div class="avatar">
      <img src="${avatar}" />
    </div>`
      : '';
    const Title = title ? `<div class="bold">${title}</div>` : '';
    const Desc = desc ? `<div class="mt5 color-9">${desc}</div>` : '';
    const Content = content
      ? `<div class="flex-1 fontsize-16 ml20 mr20">${content}</div>`
      : '';
    const Operations = title ? `<div>${operations}</div>` : '';

    const body = `
    <div class="info flex-row fontsize-16">
       ${Avatar}
      <div class="flex-column ml10">
        ${Title}
        ${Desc}
      </div>
    </div>

    ${Content}
    ${Operations}
    `;

    return {
      body,
      extendsClassName:
        'flex-row align-items-center justify-content-space-between',
    };
  },
};

export default function createTemplate(props: IProps) {
  const { type } = props;
  const className = 'list-item-' + type;

  const {
    body = '',
    extendsClassName = '',
    extendsStyles = '',
  } = (type && bodyGenerator[type] && bodyGenerator[type](props)) || {};

  const style = extendsStyles ? `style="${extendsStyles}"` : '';

  const template = `
  <div class="rm-list-item-container ${className} ${extendsClassName}" ${style}>
    ${body}
  </div>
  `;

  return template;
}

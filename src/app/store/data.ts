import { Post } from '../models/post';
import { User } from '../models/user';

export type PostMap = {
  [key: number]: Post;
};

export const POSTS: PostMap = {
  1: {
    id: 1,
    title: 'Sample blog post',
    lede: 'This blog post shows a few different types of content that’s supported and styled with Bootstrap. Basic typography, lists, tables, images, code, and more are all supported as expected.',
    imageUrl: '',
    bodyHtml: '<p>This is some additional paragraph placeholder content. It has been written to fill the available space and\n' +
      '        show how a longer snippet of text affects the surrounding content. We\'ll repeat it often to keep the\n' +
      '        demonstration flowing, so be on the lookout for this exact same string of text.</p>\n' +
      '      <h2>Blockquotes</h2>\n' +
      '      <p>This is an example blockquote in action:</p>\n' +
      '      <blockquote class="blockquote">\n' +
      '        <p>Quoted text goes here.</p>\n' +
      '      </blockquote>\n' +
      '      <p>This is some additional paragraph placeholder content. It has been written to fill the available space and\n' +
      '        show how a longer snippet of text affects the surrounding content. We\'ll repeat it often to keep the\n' +
      '        demonstration flowing, so be on the lookout for this exact same string of text.</p>\n' +
      '      <h3>Example lists</h3>\n' +
      '      <p>This is some additional paragraph placeholder content. It\'s a slightly shorter version of the other highly\n' +
      '        repetitive body text used throughout. This is an example unordered list:</p>\n' +
      '      <ul>\n' +
      '        <li>First list item</li>\n' +
      '        <li>Second list item with a longer description</li>\n' +
      '        <li>Third list item to close it out</li>\n' +
      '      </ul>\n' +
      '      <p>And this is an ordered list:</p>\n' +
      '      <ol>\n' +
      '        <li>First list item</li>\n' +
      '        <li>Second list item with a longer description</li>\n' +
      '        <li>Third list item to close it out</li>\n' +
      '      </ol>\n' +
      '      <p>And this is a definition list:</p>\n' +
      '      <dl>\n' +
      '        <dt>HyperText Markup Language (HTML)</dt>\n' +
      '        <dd>The language used to describe and define the content of a Web page</dd>\n' +
      '        <dt>Cascading Style Sheets (CSS)</dt>\n' +
      '        <dd>Used to describe the appearance of Web content</dd>\n' +
      '        <dt>JavaScript (JS)</dt>\n' +
      '        <dd>The programming language used to build advanced Web sites and applications</dd>\n' +
      '      </dl>\n' +
      '      <h2>Inline HTML elements</h2>\n' +
      '      <p>HTML defines a long list of available inline tags, a complete list of which can be found on the <a\n' +
      '        href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element">Mozilla Developer Network</a>.</p>\n' +
      '      <ul>\n' +
      '        <li><strong>To bold text</strong>, use <code\n' +
      '          class="language-plaintext highlighter-rouge">&lt;strong&gt;</code>.\n' +
      '        </li>\n' +
      '        <li><em>To italicize text</em>, use <code class="language-plaintext highlighter-rouge">&lt;em&gt;</code>.</li>\n' +
      '        <li>Abbreviations, like <abbr title="HyperText Markup Language">HTML</abbr> should use <code\n' +
      '          class="language-plaintext highlighter-rouge">&lt;abbr&gt;</code>, with an optional <code\n' +
      '          class="language-plaintext highlighter-rouge">title</code> attribute for the full phrase.\n' +
      '        </li>\n' +
      '        <li>Citations, like <cite>— Mark Otto</cite>, should use <code class="language-plaintext highlighter-rouge">&lt;cite&gt;</code>.\n' +
      '        </li>\n' +
      '        <li>\n' +
      '          <del>Deleted</del>\n' +
      '          text should use <code class="language-plaintext highlighter-rouge">&lt;del&gt;</code> and\n' +
      '          <ins>inserted</ins>\n' +
      '          text should use <code class="language-plaintext highlighter-rouge">&lt;ins&gt;</code>.\n' +
      '        </li>\n' +
      '        <li>Superscript <sup>text</sup> uses <code class="language-plaintext highlighter-rouge">&lt;sup&gt;</code> and\n' +
      '          subscript <sub>text</sub> uses <code class="language-plaintext highlighter-rouge">&lt;sub&gt;</code>.\n' +
      '        </li>\n' +
      '      </ul>\n' +
      '      <p>Most of these elements are styled by browsers with few modifications on our part.</p>\n' +
      '      <h2>Heading</h2>\n' +
      '      <p>This is some additional paragraph placeholder content. It has been written to fill the available space and\n' +
      '        show how a longer snippet of text affects the surrounding content. We\'ll repeat it often to keep the\n' +
      '        demonstration flowing, so be on the lookout for this exact same string of text.</p>\n' +
      '      <h3>Sub-heading</h3>\n' +
      '      <p>This is some additional paragraph placeholder content. It has been written to fill the available space and\n' +
      '        show how a longer snippet of text affects the surrounding content. We\'ll repeat it often to keep the\n' +
      '        demonstration flowing, so be on the lookout for this exact same string of text.</p>\n' +
      '      <pre><code>Example code block</code></pre>\n' +
      '      <p>This is some additional paragraph placeholder content. It\'s a slightly shorter version of the other highly\n' +
      '        repetitive body text used throughout.</p>',
    authorId: 1,
    publishedDate: '2023-01-01T09:00:00Z'
  }
};

export type UserMap = {
  [key: number]: User;
};

export const USERS: UserMap = {
  1: {
    id: 1,
    firstName: 'Grant',
    lastName: 'Lindsay',
    profileUrl: 'https://www.linkedin.com/in/grant-lindsay-us/',
    profileImageUrl: 'http://via.placeholder.com/50x50'
  }
};

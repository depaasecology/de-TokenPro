import type { FC } from 'react';
import { useCallback } from 'react';

import { useIntl } from 'react-intl';

import { Center, Text, useSafeAreaInsets } from '@onekeyhq/components';
import { useHelpLink } from '@onekeyhq/kit/src/hooks';
import { openUrl } from '@onekeyhq/kit/src/utils/openUrl';

const userAgreementHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>detoken</title>
    <style>
      ul {
        padding: 0;
      }
      article {
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <article class="col" itemscope="">
      <header class="py-4">
        <h1 title="服务协议" itemprop="name">服务协议</h1>
      </header>

      <section class="content article-content mb-6" itemprop="articleBody">
        <div
          id="table-of-contents"
          data-element="table-of-contents"
          data-template="table-of-contents"
          data-selector=".content h2"
        ></div>

        <ul class="ul1">
          <li class="li6">
            <p class="p1">
              本协议是您（以下简称“用户<span class="s1">”</span>）与<span
                class="s1"
              >
                DEToken </span
              >官方平台（包括<span class="s1">&nbsp;Web&nbsp;</span
              >端、移动端及应用程序，以下统称“平台<span class="s1">”</span
              >）的所有者<span class="s1"> DEToken </span
              >（以下简称“<span class="s1">DEToken”</span>）之间就<span
                class="s1"
              >
                DEToken </span
              >冷钱包服务等相关事宜所订立的契约，对用户与<span class="s1">
                DEToken </span
              >具有法律约束力。<span class="s1">DEToken </span
              >在此特别提醒用户认真阅读并充分理解本协议项下的各条款，特别是本协议中涉及免除或限制平台责任的条款，以及排除或限制用户权利的条款。用户应当审慎阅读，并选择接受或不接受本协议。除非用户接受本协议项下的所有条款，否则用户无权使用平台基于本协议所提供的服务。若用户不同意本协议的内容，或拒绝承认平台随时对本协议进行单方修改的权利，则用户应当立即停止使用并不再访问本平台。用户使用平台服务（包括但不限于使用、浏览等）即视为对本协议全部条款（包括<span
                class="s1"
              >
                DEToken </span
              >对本协议随时做出的任何修改）充分理解并完全接受，本协议即刻成立并生效。用户使用冷钱包服务除须遵守本协议以外，还须遵守平台公示的其他协议及规则，包括但不限于使用许可协议、隐私政策、售后服务政策和法律声明以及其他在平台上已经发布或将来可能发布的各类协议、规则、公告、声明、说明或指引等（包括其不时修订，以下统称“规则<span
                class="s1"
                >”</span
              >）。
            </p>
            <p class="p1">第一条<span class="s1">&nbsp;</span>释义</p>
            <p class="p1">
              <span class="s1">1.1 </span>“本协议<span class="s1">”</span
              >，指本用户服务协议及其不时修订。
            </p>
            <p class="p1">
              <span class="s1">1.2 </span>“冷钱包<span class="s1">”</span
              >，指基于分层确定性<span class="s1"
                >&nbsp;(Hierarchical Deterministic</span
              >，简称<span class="s1">&nbsp;HD)</span
              >技术方案来实现数字资产安全管理的硬件产品工具。冷钱包采用两种技术方案生成不同币种的私钥，一种为随机生成种子密码，并设置支付密码，由种子密码联合支付密码共同生成不同币种的私钥；另一种为随机生成助记词，由助记词生成不同币种的私钥。最终都由私钥生成公钥，最后由公钥生成资产地址来实现数字资产的安全管理，其中<span
                class="s1"
                >DEToken</span
              >冷钱包服务仅对用户私钥进行保护管理，用户资产仍在区块链中，<span
                class="s1"
                >DEToken</span
              >并不直接或间接托管用户资产。
            </p>
            <p class="p1">
              <span class="s1">1.3 </span>“热钱包<span class="s1">”</span
              >，指基于区块链开发的数字资产管理工具，包括其他为方便用户使用区块链系统而开发的辅助工具。
            </p>
            <p class="p1">
              <span class="s1">1.4 </span>“公钥<span class="s1">”</span
              >，由私钥借助密码学原理单向推导生成，并用以生成区块链数字钱包地址，数字钱包地址即为公开收款地址。
            </p>
            <p class="p1">
              <span class="s1">1.5 </span>“私钥<span class="s1">”</span
              >，由<span class="s1">256</span
              >位随机字符构成，是用户拥有并使用数字资产的关键。
            </p>
            <p class="p1">
              <span class="s1">1.6 </span>“助记词<span class="s1">”</span
              >，指符合区块链<span class="s1">BIP39</span
              >行业标准，由随机算法生成的<span class="s1">12</span>（或<span
                class="s1"
                >15/18/21/24</span
              >）个有序单词组成，是私钥的易记录表现形式，方便用户备份保管。
            </p>
            <p class="p1">
              <span class="s1">1.7 </span>“支付密码<span class="s1">”</span
              >，用户在创建钱包过程中，用户应当设置密码，该密码将被用于联合种子密码共同生成币种私钥，此密码不可修改，一旦用户丢失或忘记此密码，资产将无法找回。
            </p>
            <p class="p1">
              <span class="s1">1.8 </span>“安全密码<span class="s1">”</span
              >，用户在创建钱包过程中，用户应当设置密码，该密码将被用于保护私钥。安全密码不储存在用户的移动设备或<span
                class="s1"
              >
                DEToken </span
              >平台服务器，一旦用户忘记密码将无法找回，用户可借助私钥或助记词重新导入钱包后设置新的安全密码。
            </p>
            <p class="p1">第二条<span class="s1">&nbsp;</span>平台服务</p>
            <p class="p1">
              <span class="s1">2.1&nbsp;</span
              >用户可以选择使用平台的不同语言版本，若存在平台的不同语言版本之内容不一致或者相冲突，或遗漏内容之情形，平台的中文文本应当优先适用。
            </p>
            <p class="p1">
              <span class="s1">2.2&nbsp;</span
              >平台系数字资产安全服务平台，由<span class="s1"> DEToken </span
              >向用户提供，具体服务内容主要包括：数字资产安全服务、用户服务等辅助服务，具体详情以平台实际提供的服务内容为准。
            </p>
            <p class="p1">
              <span class="s1">2.3&nbsp;</span>用户访问或使用<span class="s1">
                DEToken </span
              >平台服务，用户必须自行配备接入互联网所需上网设备，自行负担此服务各项费用，包括并不限于网络接入费、手机流量费等。当涉及使用任何第三方服务时，用户还应遵守第三方的服务准则和相关费用的规定。
            </p>
            <p class="p1">
              <span class="s1">2.4&nbsp;</span>在本协议履行过程中，<span
                class="s1"
                >DEToken </span
              >可根据情况对本协议进行修改。一旦本协议的内容发生变动，<span
                class="s1"
                >DEToken </span
              >将公布最新的服务协议，不再向用户作个别通知。如果用户不同意<span
                class="s1"
              >
                DEToken </span
              >对本协议所做的修改，用户有权停止使用平台服务。如果用户继续使用平台服务，则视为用户接受<span
                class="s1"
              >
                DEToken </span
              >对本协议所做的修改，并应遵照修改后的协议执行。
            </p>
            <p class="p1">
              <span class="s1">2.5&nbsp;DEToken </span
              >对于用户的通知及任何其他的协议、规则、告示或其他关于用户使用服务的通知，用户同意<span
                class="s1"
                >DEToken </span
              >可通过平台公告、站内信、电子邮件、手机短信等电子方式或邮寄等物理方式进行，该等通知于发送之日视为已送达收件人（如以邮寄方式向用户发出通知的，则在该等通知按照用户在平台留存的联系地址交邮后的第三个自然日即视为送达）。因不可归责于<span
                class="s1"
              >
                DEToken </span
              >的原因（包括电子邮件地址、手机号码、联系地址等不准确或无效、信息传输故障等）导致用户未在前述通知视为送达之日收到该等通知的，<span
                class="s1"
                >DEToken </span
              >不承担任何责任。
            </p>
            <p class="p1">
              <span class="s1">2.6&nbsp;</span
              >为了尽可能避免任何对资产钱包的误操作或数字资产的任何安全风险，用户应避免在不具备区块链基础知识的前提下使用本平台服务。对不具备区块链基础知识的用户，<span
                class="s1"
                >DEToken </span
              >有权拒绝提供部分或全部的服务功能。
            </p>
            <p class="p1">
              <span class="s1"><strong>2.7</strong> </span
              >为积极响应中国十部委联合发布《关于进一步防范和处置虚拟货币交易炒作风险通知》（以下简称《通知》）<span
                class="s2"
                >的</span
              >要求，<span class="s1">DEToken </span
              >平台已中国境内用户终止相关部分的功能服务，终止可能涉及交易相关的及<span
                class="s2"
                >可能</span
              >不符合《通知》等规范性文件或法律、法规规定的第三方<span
                class="s2"
                >平台（定义见下）的</span
              >金融应用，<span class="s2">仅</span
              >保留钱包的基础服务功能。其中终止的第三方应用包括但不限于：去中心化币币兑换、质押挖矿、流动性挖矿、借贷、衍生品等<span
                class="s1"
              >
                DeFi </span
              >应用等，<span class="s1">DEToken</span>并不是<span class="s2"
                >该等</span
              >业务的提供方且并不因<span class="s2">该等</span
              >服务获利，为此，用户同意，自行承担因上述情形造成的风险及损失，<span
                class="s2"
                >并</span
              >同意<span class="s1">DEToken</span
              >无须因此向用户承担赔偿责任或其他责任。
            </p>
            <p class="p1">
              <span class="s1">2.8&nbsp;</span>用户理解存在如下情形时，<span
                class="s1"
                >DEToken </span
              >将修改、暂停或彻底关闭平台服务，生效日期以平台公告为准，用户同意<span
                class="s1"
              >
                DEToken </span
              >无须因此向用户承担任何违约或赔偿、补偿责任：
            </p>
            <p class="p1">
              （<span class="s1">1</span
              >）因设备、区块链系统维修、升级、故障和通信中断等技术原因而中断平台的运营；
            </p>
            <p class="p1">
              （<span class="s1">2</span
              >）因不可抗力等因素造成平台不能提供服务或<span class="s1">
                DEToken </span
              >合理认为继续提供服务会有较大风险的；
            </p>
            <p class="p1">
              （<span class="s1">3</span
              >）适用法律或政策发生重大不利变化的；或依据用户所属主权国家或地区的法律法规、规则、命令等规范的要求；
            </p>
            <p class="p1">
              （<span class="s1">4</span>）出于保护平台或用户利益之合法利益；
            </p>
            <p class="p1">
              （<span class="s1">5</span
              >）发生平台无法控制或合理预见的其他情形。
            </p>
            <p class="p1">第三条<span class="s1">&nbsp;</span>服务内容</p>
            <p class="p2">3.1&nbsp;<span class="s3">钱包创建</span></p>
            <p class="p1">
              （<span class="s1">1</span
              >）用户第一次创建钱包时，会弹出本协议，用户一旦同意创建钱包，即表示用户同意本协议的全部内容，且用户受到本协议之约束。若用户不具备本协议所要求之主体资格，则用户应承担因此而导致的一切后果，且<span
                class="s1"
              >
                DEToken </span
              >保留向用户追究责任的权利。
            </p>
            <p class="p1">
              （<span class="s1">2</span
              >）用户在此承诺，出于合法目的创建钱包及使用平台服务，且不具有以平台或平台服务为媒介违反<span
                class="s2"
                >相关适用</span
              >法律法规之意图；用户保证存入与<span class="s1">DEToken</span
              >平台账户关联的区块链账户下的数字资产来源合法；除本协议以外，用户应同时遵守平台不时发布及更新的全部规则，包括公告、使用流程说明、风险提示等。
            </p>
            <p class="p1">
              <span class="s1">3.2&nbsp;</span>平台提供的用户服务
            </p>
            <p class="p1">
              （<span class="s1">1</span>）平台根据注册规则对用户提供如下服务：
            </p>
            <p class="p1"><span class="s1">a&nbsp;</span>数字资产安全服务；</p>
            <p class="p1">
              <span class="s1">b&nbsp;</span
              >数字资产的实时行情信息服务，基于用户所在地<span class="s2"
                >法律</span
              >法规要求，提供部分用户交易信息服务；
            </p>
            <p class="p1"><span class="s1">c&nbsp;</span>提供用户服务；</p>
            <p class="p1">
              <span class="s1">d&nbsp;</span>保障平台正常运营的技术和管理服务；
            </p>
            <p class="p1">
              <span class="s1">e&nbsp;</span>平台公示的其他服务。
            </p>
            <p class="p1">
              （<span class="s1">2</span
              >）秉承着区块链的去中心化特点，并为了保护用户数字资产安全，平台提供的是去中心化服务，区别于银行业金融机构。用户了解并接受，平台不承担以下责任：存储用户的安全密码（即用户创建<span
                class="s1"
                >/</span
              >导入钱包时设置的密码）、私钥、助记词；找回用户的安全密码、私钥、助记词；冻结钱包；挂失钱包；恢复钱包等。
            </p>
            <p class="p1">
              （<span class="s1">3</span
              >）用户应当自行承担保管含有资产钱包的移动设备、备份钱包信息、备份安全密码、助记词、私钥的责任。如用户遗失移动设备、删除且未备份钱包信息、删除且未备份钱包、钱包被盗或遗忘安全密码、私钥、助记词，平台均无法还原钱包或找回安全密码、私钥、助记词；如用户进行交易时误操作（例如输错转账地址、输错转账数额），平台无法取消交易，且平台亦不应对此承担任何责任。
            </p>
            <p class="p1">
              <span class="s1">3.3&nbsp;</span>冷钱包等相关硬件产品
            </p>
            <p class="p1">
              （<span class="s1">1</span
              >）平台所发布的产品信息随时都有可能发生变动，因此，<span
                class="s1"
                >DEToken </span
              >可能对平台页面中的文字表述、图片效果进行实时修改和调整。<span
                class="s1"
                >DEToken </span
              >将尽合理的商业努力，使平台内展示的产品规格参数、功能说明、零部件信息、库存、限购数量等产品信息尽可能准确、详细并与实际产品信息相匹配，但由于平台上产品信息的数量极其庞大，且受网络技术发展水平、产品批次和生产供应因素的实时变化等因素的限制，平台不排除部分信息会存在滞后或差错的可能性。
            </p>
            <p class="p1">
              （<span class="s1">2</span
              >）平台对产品进行明码标价，但用户应当了解并同意，<span class="s1"
                >DEToken </span
              >的产品价格信息随时都有可能发生变动，因产品成交价格须以<span
                class="s1"
                >DEToken</span
              >确认的用户提交订单结算时的价格为准。同时，尽管<span class="s1">
                DEToken </span
              >会尽最大努力确保平台商品价格的准确性，但仍然可能出现部分商品标价错误的情形，对于明显错误标价的商品，<span
                class="s1"
                >DEToken </span
              >保留不予确认或取消相应订单的权利。
            </p>
            <p class="p1">
              （<span class="s1">3</span
              >）用户下订单时，用户需仔细确认所购产品的名称、价格、数量、型号、规格、尺寸、联系地址、电话、收货人等信息。收货人与用户本人不一致的，收货人的行为和意思表示视为用户的行为和意思表示，用户应对收货人的行为及意思表示的法律后果承担责任。
            </p>
            <p class="p1">
              （<span class="s1">4</span
              >）订单提交成功仅是计算机信息系统根据您填写的内容自动生成的数据，仅是用户向<span
                class="s1"
              >
                DEToken </span
              >发出的交易请求，并非<span class="s1"> DEToken </span
              >对用户所下订单的承诺；<span class="s1">DEToken </span
              >在收到用户的订单信息后，只有以实际行动或明确意思表示确认用户发出的订单（如向用户发送确认订单的短信、确认订单的电子邮件）或将用户在订单中订购的产品从仓库实际直接向用户发出时（以产品出库为标志），方视为用户与<span
                class="s1"
              >
                DEToken </span
              >之间就实际直接确认或直接向用户发出的产品建立了交易关系。用户可以随时登录平台查询订单状态。
            </p>
            <p class="p1">
              （<span class="s1">5</span>）<span class="s1">DEToken </span
              >或<span class="s1"> DEToken </span
              >授权的销售方将会把产品送达用户指定的收货地址，所有在平台上列出的送货时间为参考时间，参考时间的计算是根据库存状况、正常的处理过程和送货时间、送货地点的基础上估计得出的，<span
                class="s1"
                >DEToken </span
              >或其授权的销售方不对实际送货时间与平台上显示的送货时间的差异向用户或收货人承担任何责任。
            </p>
            <p class="p1">第四条<span class="s1">&nbsp;</span>平台责任限制</p>
            <p class="p1">
              <span class="s1">4.1&nbsp;DEToken </span
              >不对以下服务提供任何形式的保证：
            </p>
            <p class="p1">
              （<span class="s1">1</span>）平台服务将符合用户的需求；
            </p>
            <p class="p1">
              （<span class="s1">2</span
              >）平台服务将不受干扰、及时提供或免于出错；
            </p>
            <p class="p1">
              （<span class="s1">3</span
              >）用户经由平台服务购买或取得之任何产品、服务、资讯或其他资料将符合用户的期望；
            </p>
            <p class="p1">
              （<span class="s1">4</span
              >）平台包含的全部信息、程序、文本、数据等完全安全，不受任何病毒、木马等恶意程序的干扰和破坏；
            </p>
            <p class="p1">
              （<span class="s1">5</span
              >）所有的交易结果计算都经过平台核实，相应的计算方法都会在平台上进行公示，但是平台不能保证其计算没有误差或不受干扰。
            </p>
            <p class="p1">
              <span class="s1">4.2</span>用户知悉并同意，在任何情形下，<span
                class="s1"
                >DEToken </span
              >不会就下列任一事项承担责任：
            </p>
            <p class="p1">（<span class="s1">1</span>）用户的收入损失；</p>
            <p class="p1">
              （<span class="s1">2</span>）用户的交易利润或合同预期利益损失；
            </p>
            <p class="p1">
              （<span class="s1">3</span>）服务中断、中止或终止而引起的损失；
            </p>
            <p class="p1">
              （<span class="s1">4</span>）预期可节省交易成本的损失；
            </p>
            <p class="p1">
              （<span class="s1">5</span>）信息传递问题而造成的损失；
            </p>
            <p class="p1">
              （<span class="s1">6</span>）数据的遗失或损坏而造成的损失；
            </p>
            <p class="p1">
              （<span class="s1">7</span
              >）任何由于违约导致的间接的、特殊的或附带性的损失，不论此种损失是否为平台所能合理预见，亦不论平台是否事先被告知存在此种损失的可能性；
            </p>
            <p class="p1">
              （<span class="s1">8</span
              >）因用户遗失移动设备、删除且未备份钱包信息、遗忘且未备份安全密码、私钥、助记词等而导致该用户的数字资产丢失；
            </p>
            <p class="p1">
              （<span class="s1">9</span
              >）因用户于已知或未知情况下自行泄露安全密码、私钥、助记词等，或借用、转让或授权他人使用自己的移动设备或钱包，或未通过<span
                class="s1"
              >
                DEToken </span
              >官方渠道下载平台应用程序或以其他不安全的方式使用平台应用程序导致的用户的数字资产丢失；
            </p>
            <p class="p1">
              （<span class="s1">10</span
              >）因用户错误操作（包括但不限于用户输错转账地址、用户自身选择转账节点服务器的问题）导致的数字资产丢失；
            </p>
            <p class="p1">
              （<span class="s1">11</span
              >）因用户不理解区块链技术的知识而进行误操作导致的该用户的数字资产丢失；
            </p>
            <p class="p1">
              （<span class="s1">12</span
              >）因系统滞后、区块链不稳定等原因导致平台拷贝用户在区块链上的交易记录发生偏差。
            </p>
            <p class="p1">
              <span class="s1">4.3</span
              >用户知悉并同意，发生以下任一情形时，<span class="s1"
                >DEToken </span
              >有权拒绝赔偿用户的全部或部分损失：
            </p>
            <p class="p1">
              （<span class="s1">1</span>）<span class="s1">DEToken </span
              >有合理的理由认为用户在平台的行为系涉嫌违法或不道德行为；
            </p>
            <p class="p1">
              （<span class="s1">2</span>）用户误以为系平台原因造成损失的情形；
            </p>
            <p class="p1">
              （<span class="s1">3</span>）任何非因平台原因引起的其他损失。
            </p>
            <p class="p1">
              <span class="s1">4.4&nbsp;</span
              >平台上的第三方服务由第三方服务商提供，第三方服务商所提供的服务品质及内容由该等第三方服务商自行负责。平台的内容可能涉及由第三方所有、控制或者运营的其他平台（以下简称“第三方平台<span
                class="s1"
                >”</span
              >）。平台不能保证也没有义务保证第三方平台上任何信息的真实性和有效性。用户确认按照第三方平台的服务协议使用第三方平台，而不是按照本协议。第三方平台的内容、产品、广告和其他任何信息均由用户自行判断并承担风险，而与<span
                class="s1"
              >
                DEToken </span
              >平台无关。用户经由平台服务的使用下载或取得任何资料，应由用户自行考量且自负风险，因资料的下载而导致的任何损失由用户自行承担。
            </p>
            <p class="p1">
              <span class="s1">4.5&nbsp;</span>由于<span class="s1">DEToken</span
              >提供标准化服务，<span class="s1">DEToken&nbsp;</span
              >无法合理预知其违约行为可能给用户造成的损失，<span class="s1"
                >DEToken&nbsp;</span
              >亦不因用户使用本服务获得利益而收取额外费用，为此，用户同意，在法律允许的情况下，<span
                class="s1"
                >DEToken </span
              >对于与本协议有关或由本协议引起的，或者由于使用平台、或由于其所包含的或以其他方式通过平台提供给用户的全部信息、内容、材料、产品（包括软件）和服务、或购买和使用产品引起的任何间接的、惩罚性的、特殊的、派生的损失（包括业务损失、收益损失、利润损失、使用数据或其他经济利益的损失），不论是如何产生的，均不负有任何责任，即使其事先已被告知此等损失的可能性。
            </p>
            <p class="p1">
              <span class="s1">4.6&nbsp;DEToken </span
              >在本协议中做出的保证和承诺是<span class="s1"> DEToken </span
              >就其依据本协议提供平台服务的唯一保证和陈述（以下简称“协议保证<span
                class="s1"
                >”</span
              >），所有协议保证仅针对平台做出，对平台自身具有约束力，其效力不能约束任何第三方。
            </p>
            <p class="p1">
              <span class="s1">4.7&nbsp;</span
              >如因不可抗力或其它无法控制的原因使平台系统崩溃或无法正常使用导致交易无法完成或丢失有关的信息、记录等，<span
                class="s1"
                >DEToken </span
              >会尽合理努力协助处理善后事宜，用户同意自行承担因上述情形造成的风险及损失，同意<span
                class="s1"
                >DEToken</span
              >无须因此向用户承担赔偿责任或其他责任。
            </p>
            <p class="p1">
              第五条<span class="s1">&nbsp;</span>用户的声明与承诺
            </p>
            <p class="p1">
              <strong><span class="s1">5.1&nbsp;</span></strong
              >用户声明，<span class="s2">其</span
              >具备完全民事权利能力和完全民事行为能力，能够独立承担法律责任<span
                class="s2"
                >，</span
              >且绝不为任何非法目的或以任何非法方式使用平台服务<span class="s2"
                >。用户</span
              >承诺遵守其所在国的相关法律、法规及一切使用互联网之国际惯例，遵守所有与平台服务有关的网络协议、规则和程序<span
                class="s2"
                >。</span
              >如用户所在地<span class="s2">或</span>账户注册地相关<span
                class="s2"
                >法律</span
              >法规发生变化，用户应遵守最新<span class="s2">法律</span>法规<span
                class="s2"
                >的</span
              >要求，主动避<span class="s2">免</span>使用<span class="s2"
                >相关</span
              >法律<span class="s2">法规禁止</span>的平台<span class="s2"
                >的相关</span
              >产品服务<span class="s2">。</span
              >用户保证主动并足额缴纳用户所在地及账户注册地因平台服务账户内金额变动产生的相关税费，且<span
                class="s2"
                >同意</span
              >平台没有相关权利义务<span class="s2">对此</span
              >进行监督。用户违反本项条件，<span class="s1">DEToken </span
              >可随时、全权决定拒绝向用户提供服务，且<span class="s1"
                >DEToken</span
              >不因由于用户未遵守<span class="s2">相关法律</span
              >法规使用相关服务承担监督管理等一系列连带责任。若因此给<span
                class="s1"
              >
                DEToken </span
              >或第三方造成损失，用户还须承担全部赔偿责任。如用户为限制民事行为能力人，只能在父母或监护人的监护参与下才能使用本平台，否则<span
                class="s1"
              >
                DEToken </span
              >有权在法律允许范围内暂停或关闭用户的账户。
            </p>
            <p class="p1">
              <span class="s1">5.2&nbsp;</span
              >用户理解并同意，用户在平台上选择的第三方服务由用户自行评估和选择。<span
                class="s1"
                >DEToken </span
              >对用户在平台上选择使用的第三方服务行为不承担任何责任，<span
                class="s1"
                >DEToken </span
              >无法也没有义务保证用户使用结果，用户因使用第三方服务导致的损失亦由用户自行承担，<span
                class="s1"
                >DEToken </span
              >不承担责任。
            </p>
            <p class="p1">
              <span class="s1">5.3&nbsp;</span
              >用户同意，对其平台注册账号下发生的所有活动（包括信息披露、发布信息、点击同意各类协议、上传提交各类文件、点击同意续签各类协议或点击同意第三方提供的服务协议等）承担责任，且在上述活动进程中，若用户未遵从本协议条款或平台公布的交易规则中的操作指示的，平台不承担任何责任。
            </p>
            <p class="p1">
              <span class="s1">5.4&nbsp;</span>用户同意，<span class="s1"
                >DEToken </span
              >有权在提供平台服务过程中以各种方式投放各种商业性广告或其他任何类型的商业信息（包括在平台的任何页面上投放广告），并且，用户同意接受平台通过电子邮件或其他方式向用户发送商业促销或其他相关商业信息。
            </p>
            <p class="p1">
              <span class="s1">5.5&nbsp;</span
              >用户同意，若用户因使用第三方服务与服务提供方或其他第三方产生纠纷的，不得通过司法或行政以外的途径要求平台提供相关资料。
            </p>
            <p class="p1">
              <span class="s1">5.6&nbsp;</span
              >用户使用平台服务时必须遵守国家法律法规，用户承诺严格履行以下义务：
            </p>
            <p class="p1">
              （<span class="s1">1</span
              >）不得传输或发表：煽动抗拒、破坏宪法和法律、行政法规实施的言论，煽动颠覆国家政权，推翻社会主义制度的言论，煽动分裂国家、破坏国家统一的言论，煽动民族仇恨、民族歧视、破坏民族团结的言论；
            </p>
            <p class="p1">
              （<span class="s1">2</span
              >）进行中国大陆及境外间传输资料信息时必须符合中国及境外所在国有关法规；
            </p>
            <p class="p1">
              （<span class="s1">3</span
              >）不得利用平台或平台服务从事洗钱、窃取商业秘密、窃取个人信息等违法犯罪活动；
            </p>
            <p class="p1">
              （<span class="s1">4</span
              >）不得干扰平台的正常运转，不得侵入平台及国家计算机信息系统；
            </p>
            <p class="p1">
              （<span class="s1">5</span
              >）不得传输或发表任何违法犯罪的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的，淫秽的、不文明的等信息资料；
            </p>
            <p class="p1">
              （<span class="s1">6</span
              >）不得传输或发表损害国家社会公共利益和涉及国家安全的信息资料或言论；
            </p>
            <p class="p1">
              （<span class="s1">7</span>）不得教唆他人从事本条所禁止的行为；
            </p>
            <p class="p1">
              （<span class="s1">8</span
              >）不得利用在平台注册的账户进行牟利性经营活动；
            </p>
            <p class="p1">
              （<span class="s1">9</span
              >）不得发布任何侵犯他人著作权、商标权等知识产权或合法权利的内容；
            </p>
            <p class="p1">
              （<span class="s1">10</span
              >）不得以虚构、夸大事实等方式恶意诋毁平台商誉；
            </p>
            <p class="p1">
              （<span class="s1">11</span
              >）其他违反用户所在地及账号注册地法律法规、公序良俗、互联网利益的行为，以及其他<span
                class="s1"
              >
                DEToken </span
              >有正当理由认为不适当之行为。
            </p>
            <p class="p1">
              若用户未遵守以上规定的，<span class="s1">DEToken </span
              >有权做出独立判断并采取暂停或关闭用户账户等措施，而无需承担任何责任。
            </p>
            <p class="p1">
              <span class="s1">5.7&nbsp;</span
              >用户应不时关注并遵守平台不时公布或修改的各类规则规定。<span
                class="s1"
                >DEToken </span
              >保有依其单独判断删除平台内各类不符合法律政策或不真实或不适当的信息内容而无须通知用户的权利，并无需承担任何责任。
            </p>
            <p class="p1">
              <span class="s1">5.8&nbsp;</span
              >用户同意，由于用户违反本协议、平台规则，或违反通过援引并入本协议并成为本协议一部分的文件，或由于用户使用平台服务违反了任何法律或损害第三方的权利而造成任何第三方进行或发起的任何赔偿或补偿申请或要求（包括律师费用），用户需对<span
                class="s1"
              >
                DEToken </span
              >及其关联方、合作伙伴、董事以及雇员等遭受损失方给予全额赔偿或补偿并使之不受损害。
            </p>
            <p class="p1">
              <span class="s1">5.9&nbsp;</span
              >若用户违反本协议、平台规则内容或发生违反法律法规、损害第三方合法权益的行为，<span
                class="s1"
                >DEToken </span
              >有权视情节的严重采取警告、暂停服务、取消订单、禁止交易、关闭账号、永久禁止注册等措施，给<span
                class="s1"
              >
                DEToken </span
              >或第三方造成损失的，<span class="s1">DEToken </span
              >有权采取一切合法的诉讼与非诉讼手段进行索赔；用户行为构成犯罪的，<span
                class="s1"
                >DEToken </span
              >有权向有关部门举报并协助进行查处。
            </p>
            <p class="p1">第六条<span class="s1">&nbsp;</span>服务费用</p>
            <p class="p1">
              <span class="s1">6.1&nbsp;</span
              >用户使用平台服务时，若平台向用户收取相关平台服务费用，各项平台服务费用详见用户使用平台服务时平台上所列之收费说明及收费标准。平台保留单方面制定及调整平台服务费用收费标准的权利。
            </p>
            <p class="p1">
              <span class="s1">6.2&nbsp;</span
              >基于区块链公共约定，使用平台进行数字货币流动时理应或可能产生支付“矿工费<span
                class="s1"
                >”</span
              >或<span class="s1">“</span>网络费<span class="s1">”</span
              >，该金额由用户自行决定，并由相关区块链网络收取，<span class="s1"
                >DEToken</span
              >并不是该笔费用的收取方且并不从中获利。用户知悉，在特定情况（包括但不限于用户在转账期间为转账支付的“矿工费<span
                class="s1"
                >”</span
              >或<span class="s1">“</span>网络费<span class="s1">”</span
              >不足，或相关区块链网络不稳定）下，用户的转账操作可能失败；在该等情况下，即便用户的转账操作未完成，用户亦会被相关区块链网络收取<span
                class="s1"
                >“</span
              >矿工费<span class="s1">”</span>或网络费。
            </p>
            <p class="p1">
              <span class="s1">6.3&nbsp;</span
              >因使用平台服务而发生的所有应纳税负及其它方面的费用均由用户自行负责支付。
            </p>
            <p class="p1">
              第七条<span class="s1">&nbsp;</span>用户信息授权及保护
            </p>
            <p class="p2">7.1&nbsp;<span class="s3">用户信息</span></p>
            <p class="p1">
              （<span class="s1">1</span
              >）用户使用平台服务时，自主选择同步到<span class="s1">
                DEToken </span
              >服务器的公开数据，包括但不限于钱包地址、交易数据；
            </p>
            <p class="p1">
              （<span class="s1">2</span
              >）用户使用平台服务时，或访问平台时，平台自动接收并记录的用户浏览器上的服务器数值，包括但不限于<span
                class="s1"
                >IP</span
              >地址等数据及用户要求取用的网页记录；
            </p>
            <p class="p1">
              （<span class="s1">3</span
              >）平台收集到的用户在平台进行交易的有关数据，包括但不限于交易记录；
            </p>
            <p class="p1">
              （<span class="s1">4</span
              >）平台通过区块链网络获取到的和用户相关的信息。
            </p>
            <p class="p1">
              <span class="s1">7.2&nbsp;</span>用户同意，<span class="s1"
                >DEToken </span
              >可在平台的某些网页上使用诸如“<span class="s1">Cookies”</span
              >的资料收集装置，按照用户在平台上的行为自动追踪关于用户的某些资料。在不透露用户的隐私资料的前提下，平台有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。
            </p>
            <p class="p1">
              <span class="s1">7.3&nbsp;</span>用户授权<span class="s1">
                DEToken </span
              >将用户提供给平台的信息、享受平台服务产生的信息（包括本协议签署之前提供和产生的信息）以及平台根据本条约定收集的信息，用于平台及其因服务必要委托的合作伙伴为用户提供服务、推荐产品、开展市场调查与信息数据分析。
            </p>
            <p class="p1">
              <span class="s1">7.4DEToken </span
              >将根据相关法律法规以保护用户信息。用户因履行本协议提供给<span
                class="s1"
              >
                DEToken </span
              >的信息，除本协议约定之内容和目的，<span class="s1">DEToken </span
              >不会恶意出售或共享给任何第三方。<span class="s1">DEToken </span
              >亦将督促其合作伙伴对上述信息保密，并采取各种措施保证信息安全。
            </p>
            <p class="p1">第八条 所有权及知识产权</p>
            <p class="p1">
              <span class="s1">&nbsp;8.1&nbsp;</span
              >平台上所有内容，包括图片、档案、资讯、资料、平台架构、平台画面的安排、平台设计，文字和图表，软件编译，相关源代码和软件，商标等均由<span
                class="s1"
              >
                DEToken </span
              >或其他权利人依法拥有其知识产权。商标权、专利权、著作权、商业秘密等受国家法律保护，无论该等内容形成于本协议前还是本协议后。
            </p>
            <p class="p1">
              <span class="s1">8.2&nbsp;</span>除法律另有强制性规定外，未经<span
                class="s1"
              >
                DEToken </span
              >或其他权利人书面许可，任何单位或个人不得以任何方式非法地全部或部分使用、复制、转载、引用、链接、抓取或公开发表平台程序或内容，否则，<span
                class="s1"
                >DEToken </span
              >有权追究其法律责任。
            </p>
            <p class="p1">
              <span class="s1">8.3&nbsp;</span>用户未经<span class="s1">
                DEToken </span
              >的明确书面同意不得下载（除了页面缓存）或修改平台或其任何部分。用户不得对平台或其内容或平台服务进行转售或商业利用；不得收集和利用产品目录、说明和价格；不得对平台或其内容或平台服务进行任何衍生利用；不得为其他商业利益而下载或拷贝账户信息或使用任何数据采集、<span
                class="s1"
                >Robots</span
              >或类似的数据收集和摘录工具。未经平台的书面许可，严禁对平台的内容进行系统获取以直接或间接创建或编辑文集、汇编、数据库或人名地址录。另外，严禁为任何未经本协议明确允许的目的而使用平台上的内容和材料。
            </p>
            <p class="p1">
              <span class="s1">8.4&nbsp;</span
              >用户使用平台提供的任何服务均不视为<span class="s1"> DEToken </span
              >向用户转让任何知识产权。尊重知识产权是用户应尽的义务，如有违反，用户应对<span
                class="s1"
              >
                DEToken </span
              >承担损害赔偿等法律责任，<span class="s1">DEToken </span
              >并有权采取警告、暂停服务、取消订单、禁止交易、关闭账号、永久禁止注册等措施。
            </p>
            <p class="p1">第九条 风险提示</p>
            <p class="p1">
              <span class="s1">&nbsp;9.1&nbsp;DEToken </span
              >对于用户使用平台服务不做任何明示或暗示的保证，包括但不限于平台提供服务的适用性、没有错误或疏漏、持续性、准确性、可靠性、适用于某一特定用途。同时，<span
                class="s1"
                >DEToken </span
              >也不对平台提供的服务所涉及的技术及信息的有效性、准确性、正确性、可靠性、质量、稳定、完整和及时性做出任何承诺和保证。
            </p>
            <p class="p1">
              <span class="s1">9.2&nbsp;</span
              >是否使用平台服务是用户个人的决定且自行承担风险及可能产生的损失。<span
                class="s1"
                >DEToken </span
              >对于数字资产的市场、价值及价格等不做任何明示或暗示的保证，用户知悉并了解数字资产市场的不稳定性，数字资产的价格和价值随时会大幅波动或崩盘，交易数字资产是用户个人的自由选择及决定，且自行承担风险及可能产生的损失。
            </p>
            <p class="p1">
              <span class="s1">9.3&nbsp;DEToken </span
              >仅为用户使用或处理区块链数据提供软件及硬件工具服务，不对任何用户及<span
                class="s1"
                >/</span
              >或任何交易提供任何担保或条件，无论是明示、默示或法定的。<span
                class="s1"
                >DEToken </span
              >不能也不试图对用户或服务方发布的信息进行控制，对该等信息，平台不承担任何形式的证明、鉴定服务。平台不能完全保证平台内容的真实性、充分性、可靠性、准确性、完整性和有效性，并且无需承担任何由此引起的法律责任。用户应依赖于用户的独立判断进行交易，用户应对其做出的判断承担全部责任。
            </p>
            <p class="p1">
              <span class="s1">9.4&nbsp;</span
              >平台提供的行情查看功能仅系抓取部分交易所的数字资产汇率信息的搜索结果，并不表示为最新行情或最佳报价。
            </p>
            <p class="p1">
              <span class="s1">9.5&nbsp;</span>用户通过<span class="s1"
                >DEToken</span
              >工具服务进行区块链资产转账过程中，如果出现“交易失败<span
                class="s1"
                >”</span
              >、“打包超时<span class="s1">”</span
              >等类似的异常信息提示时，用户应通过相关区块链官方途径或其他的区块链查询工具进行再次确认，以避免重复转账；否则，由此所引起的一切损失和费用应由用户自行承担。
            </p>
            <p class="p1">
              <span class="s1">9.6&nbsp;</span
              >用户应当在创建或导入钱包时对用户钱包的安全密码、私钥、助记词等信息做好安全备份。用户应避免采用以下电子备份方式：截图、邮件、手机中的记事本应用、短信、微信、<span
                class="s1"
                >QQ</span
              >等电子备份方式。用户应当在纸质记事本上抄写助记词和<span
                class="s1"
                >&nbsp;Keystore&nbsp;</span
              >等信息。若用户未保存或备份安全密码、私钥、助记词等信息且在用户移动设备丢失的情况下，用户的数字资产将可能因此丢失，<span
                class="s1"
                >DEToken </span
              >无法为用户找回。因前述情形产生的任何及所有损失应由用户自行承担。
            </p>
            <p class="p1">
              <span class="s1">9.7&nbsp;</span
              >以上并不能揭示用户通过平台进行交易的全部风险及市场的全部情形。用户在做出交易决策前，应全面了解相关数字资产，根据自身的交易目标、风险承受能力和资产状况等谨慎决策，并自行承担全部风险。
            </p>
            <p class="p1">第十条 协议的终止</p>
            <p class="p1">
              <span class="s1">10.1&nbsp;</span
              >用户有权在任何时候向平台申请注销注册账户，自平台批准用户注销注册账户之日起协议终止。
            </p>
            <p class="p1">
              <span class="s1">10.2&nbsp;</span
              >用户死亡或被宣告死亡的，其在本协议项下的各项权利义务由其继承人承继。若用户丧失全部或部分民事权利能力或民事行为能力，<span
                class="s1"
                >DEToken </span
              >或其授权的主体有权根据有效法律文书（包括生效的法院判决等）或其法定监护人的指示处置与用户账户相关的款项。若继承人或法定监护人决定继续履行本协议的，则本协议依然有效；反之，则继承人或法定监护人需要依据本协议向平台申请注销账号，自平台批准用户注销账号之日起协议终止。
            </p>
            <p class="p1">
              <span class="s1">10.3&nbsp;DEToken </span
              >有权依据本协议约定终止平台全部服务，本协议于平台全部服务终止之日终止，清退流程根据平台公告的具体规定进行操作。
            </p>
            <p class="p1">
              <span class="s1">10.4&nbsp;</span>本协议终止后，用户无权要求<span
                class="s1"
              >
                DEToken </span
              >继续向其提供任何服务或履行任何其他义务，包括但不限于要求<span
                class="s1"
              >
                DEToken </span
              >为用户保留或向用户披露其原本账号中的任何信息，向用户或第三方转发任何其未曾阅读或发送过的信息等。
            </p>
            <p class="p1">
              <span class="s1">10.5&nbsp;</span
              >本协议的终止不影响守约方向违约方主张协议终止前违约方之违约责任，也不影响本协议规定之后合同义务之履行。
            </p>
            <p class="p1">第十二条<span class="s1">&nbsp;</span>法律适用</p>
            <p class="p1">
              <span class="s1">11.1&nbsp;</span
              >本协议的内容、订立、执行和解释及争议的解决均应适用中华人民共和国香港特别行政区法律。
            </p>
            <p class="p1">第十二条 其他</p>
            <p class="p1">
              <span class="s1">&nbsp;12.1&nbsp;DEToken </span
              >尊重用户的合法权利，本协议及本平台上发布的各类规则，均是为了更好的、更加便利的为用户提供服务。请用户着重阅读了解协议中以黑体、加粗等方式显著标识的条款。
            </p>
            <p class="p1">
              <span class="s1">12.2&nbsp;</span
              >如本协议中的任何条款被任何有管辖权的机构认定为不可执行的，无效的或非法的，并不影响本协议的其余条款的效力。
            </p>
            <p class="p1">
              <span class="s1">12.3&nbsp;</span
              >如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，则应认为该条款可与本协议相分割，并可被尽可能接近各方意图的、能够保留本协议要求的经济目的的、有效的新条款所取代，而且，在此情况下本协议的其他条款仍然完全有效并具有约束力。
            </p>
            <p class="p1">
              <span class="s1">12.4&nbsp;</span
              >除非本协议中的其他条款另有约定，本协议中的任何规定均不应当被认为创造了、暗示了或以其他方式将<span
                class="s1"
              >
                DEToken </span
              >视为用户的代理人、受托人或其他代表人。
            </p>
            <p class="p1">
              <span class="s1">12.5&nbsp;</span
              >对违约行为的豁免，或本协议任一条款的放弃，仅在守约方或非寻求放弃方书面签字同意豁免后方能生效。任何本协议项下的违约豁免，不能认定或解释为守约方对其后再次违约或其他违约行为的豁免；未行使任何权利或救济不得以任何方式被解释为对该等权利或救济的放弃。
            </p>
            <!-- <p class="p1">
              <span class="s1">12.6&nbsp;</span
              >如用户对本协议有任何疑问，可通过发送邮件到 hi@DEToken.so，<span
                class="s1"
                >DEToken </span
              >将为用户详细解释及说明相关条款及回复用户的疑问。
            </p> -->
          </li>
        </ul>
      </section>
    </article>
  </body>
</html>

`;

const privacyPolicyHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>detoken</title>
    <style>
      ul {
        padding: 0;
      }
      article {
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <article class="col" itemscope="" itemtype="http://schema.org/Article">
      <header class="py-4">
        <h1 title="隐私条款" itemprop="name">隐私条款</h1>
      </header>

      <section class="content article-content mb-6" itemprop="articleBody">
        <div
          id="table-of-contents"
          data-element="table-of-contents"
          data-template="table-of-contents"
          data-selector=".content h2"
        >
          <div class="border border-radius border-left-4 px-6 my-6 w-full">
            <h3>在这篇文章中</h3>
            <ol class="mb-6 list-unstyled font-size-md">
              <li class="list-item">
                <a href="#heading-1"> 一、我们收集您的哪些信息 </a>
              </li>

              <li class="list-item">
                <a href="#heading-2"> 二、我们如何使用您的信息 </a>
              </li>

              <li class="list-item">
                <a href="#heading-3"> 三、您如何控制自己的信息 </a>
              </li>

              <li class="list-item">
                <a href="#heading-4"> 四、我们可能分享或传输您的信息 </a>
              </li>

              <li class="list-item">
                <a href="#heading-5"> 五、自动数据收集技术 </a>
              </li>

              <li class="list-item">
                <a href="#heading-6"> 六、我们如何保护您的信息 </a>
              </li>

              <li class="list-item">
                <a href="#heading-7"> 七、对未成年人的保护 </a>
              </li>

              <li class="list-item">
                <a href="#heading-8"> 八、免责声明 </a>
              </li>

              <li class="list-item">
                <a href="#heading-9"> 九、其他 </a>
              </li>
            </ol>
          </div>
        </div>

        <p><strong>尊敬的用户：</strong></p>
        <p>
          DEToken（以下简称“本公司”或“我们”）尊重并保护用户（以下简称“您”或“用户”）的隐私，当您进行以下行为时，本公司按照本隐私政策（以下简称“本政策”）收集、披露和处理您的个人信息：
        </p>
        <ul>
          <li>(a)进入或使用我们的网站或移动应用（“应用”）及服务；</li>
          <li>(b)向我们提供您的个人信息，无论通过何种媒介提供。</li>
        </ul>
        <p>
          本公司建议您在使用应用之前仔细阅读并理解本政策全部内容,
          针对免责声明等条款在内的重要信息将以加粗的形式体现。本政策有关关键词定义与本公司《DEToken服务协议》保持一致。如果本政策中使用的定义或术语与《DEToken服务协议》中的不一致，以本政策为准。
        </p>
        <p>
          您向我们提供您的个人信息，即代表您同意我们根据本政策的规定收集、使用、披露（包括传输）和处理您的个人信息。如您不接受本政策，请勿向我们提供任何个人信息。
        </p>
        <p>
          本政策可由本公司在线随时更新，不另行通知。更新后的政策一经公布在我们的应用上即为生效，并代替原来的政策。修改后的政策将立刻适用于您向我们提供的个人信息。如果您不接受修改后的条款，请立即停止使用应用，您继续使用应用将被视为接受修改后的政策。
        </p>
        <h2 id="heading-1">
          <strong>一、我们收集您的哪些信息</strong
          ><a class="link-anchor" href="#heading-1"></a>
        </h2>
        <ul>
          <li>
            我们将收集您的移动设备信息、操作记录、交易记录、钱包地址等个人信息。
          </li>
          <li>
            为满足您的特定服务需求，我们将收集您的个人信息，包括但不限于您的姓名、银行卡号、手机号码、邮件地址等信息。
          </li>
          <li>
            您知悉：您在应用上的钱包密码、私钥、助记词、Keystore并不存储或同步至本公司服务器。本公司不提供找回您的钱包密码、私钥、助记词、Keystore的服务。
          </li>
          <li>
            我们可能要求向您收集更多的个人信息，以使得您可以使用应用上的某些特定功能。如您不同意提供该等个人信息，则视为您放弃使用应用的特定功能。
          </li>
          <li>
            在法律法规允许的范围内，本公司可能会在以下情形中收集并使用您的个人信息，且无需征得您的授权同意：
            <ul>
              <li>（1）与国家安全、国防安全有关的；</li>
              <li>（2）与公共安全、公共卫生、重大公共利益有关的；</li>
              <li>（3）与犯罪侦查、起诉、审判和判决执行等有关的；</li>
              <li>（4）所收集的个人信息处于公共领域；</li>
              <li>
                （5）从合法公开披露的信息中收集您的个人信息，如合法的新闻报道，政府信息公开等渠道；
              </li>
              <li>
                （6）用于维护服务的安全和合规所必需的，例如发现、处理产品和服务的故障；
              </li>
              <li>（7）法律法规允许的其他情形。</li>
            </ul>
          </li>
          <li>
            我们收集信息的方式如下：
            <ul>
              <li>（1）当您主动向我们提供信息，无论以何种理由；</li>
              <li>（2）当您授权我们向第三方获取您的信息；</li>
              <li>（3）您使用我们的应用和服务；</li>
              <li>
                （4）当您通过各种交流渠道与我们的员工联系或互动，例如通过社交平台、通讯平台、当面会议、电话、邮件、传真和书信等；
              </li>
              <li>（5）当您与我们发生交易、与我们联系或要求我们联系您；</li>
              <li>（6）当您要求订阅我们的邮件；和/或</li>
              <li>
                （7）我们通过区块链系统，拷贝您全部或部分的交易记录。但您的交易记录应当以区块链系统的记载为准。
              </li>
            </ul>
          </li>
          <li>
            我们的应用可能包含一些收集个人信息的技术，具体的收集方式将在本政策或适用的条款和条件中说明。
          </li>
          <li>
            您向我们提供个人信息系您的主动行为，您可以随时撤回同意。但是，如您选择拒绝向我们提供我们要求的个人信息，您可能无法使用应用，我们可能无法与您联系或向您提供您需要的产品或服务。
          </li>
          <li>
            在某些情况下，您可能向我们提供非您本人的个人信息。如您提供他人信息，您应当保证您已获得该等信息主体的同意，允许我们收集该信息主体的个人信息，并且信息主体同意您向我们披露其个人信息。您同意，如该等信息主体就我们根据本政策条款收集、使用和披露其个人信息向我们提出索赔，您将向我们进行赔偿并使我们免责。
          </li>
          <li>
            您应确保您向我们提供的个人信息真实、准确和完整。在您的个人信息发生变化时，您应当通知我们。
          </li>
        </ul>
        <h2 id="heading-2">
          <strong>二、我们如何使用您的信息</strong
          ><a class="link-anchor" href="#heading-2"></a>
        </h2>
        <ul>
          <li>
            我们将出于以下一个或多个目的收集、使用或披露您的个人信息：
            <ul>
              <li>（1）向您提供您要求的产品和服务；</li>
              <li>（2）处理您与我们的关系；</li>
              <li>（3）促进您的使用体验；</li>
              <li>
                （4）通过您移动设备的唯一序列号，确认您与您的钱包的对应关系；
              </li>
              <li>
                （5）向您及时发送重要通知，如软件更新、服务协议及本政策条款的变更；
              </li>
              <li>
                （6）通过钱包地址和提供的移动设备信息，协助您处理您的提问、反馈、投诉和要求；
              </li>
              <li>（7）告知您我们的产品、服务、项目和活动；</li>
              <li>
                （8）解决争议、调查任何投诉、索赔或争议、或任何实际或可以的非法行为；
              </li>
              <li>（9）进行本公司内部审计、数据分析和研究；</li>
              <li>（10）通过跟踪用户对应用的使用情况进行用户行为分析；</li>
              <li>（11）遵守法律法规规定及与监管机构的要求；</li>
              <li>（12）遵守国际法律法规对于安全以及反洗钱或反恐的要求；</li>
              <li>（13）履行我们的义务以及合同条款条件；</li>
              <li>（14）任何与前述目的有关的合理目的。</li>
            </ul>
          </li>
          <li>
            如您同意，我们将为其他目的不时使用您的个人信息，例如告知您我们的战略合作伙伴或关联方推出的最新的活动、优惠和推广信息。
          </li>
          <li>
            我们在DEToken的“使用设置”中为您提供“指纹或面容登录”选项，让您便捷地管理您的数字代币。
          </li>
          <li>
            我们在DEToken中为您提供“免密支付”选项，免密支付将您钱包密码通过安全加密算法存储至至您手机设备的Keychain/Keystore中，交易时调用您的生物识别（指纹或面容）鉴权，快速完成支付与签名。
          </li>
        </ul>
        <h2 id="heading-3">
          <strong>三、您如何控制自己的信息</strong
          ><a class="link-anchor" href="#heading-3"></a>
        </h2>
        <p>您在应用中拥有以下对您个人信息自主控制权：</p>
        <ul>
          <li>
            您可以通过同步钱包的方式，将您的其他钱包导入应用中，或者将您在应用的钱包导入到其他数字代币管理钱包中。应用将向您显示导入钱包的信息。
          </li>
          <li>
            您知悉您可以通过“资产”版块内容修改您的数字代币种类、进行转账及收款等活动。
          </li>
          <li>
            您知悉在应用“我”的版块您可以自由选择进行如下操作：
            <ul>
              <li>
                （1）在“使用设置”中，您可以选择不开启“指纹或面容登录”选项，即您可以选择不使用Touch
                ID或Face ID验证服务；
              </li>
              <li>
                （2）在“提交反馈”中，您可以随时向我们提出您对应用问题及改进建议，我们将非常乐意与您沟通并积极改进我们的服务。
              </li>
            </ul>
          </li>
          <li>
            您知悉您可以选择不开启“免密支付”选项，即您可以选择不在交易时调用您的生物识别。
          </li>
          <li>
            您知悉，您及我们对于您交易记录是否公开并没有控制权，因为基于区块链交易系统的开源属性，您的交易记录在整个区块链系统中公开透明。
          </li>
          <li>
            我们的应用将包含链接，可链接至非由我们所有、运营、开发或维护的其他网站、应用或智能合约。这些链接系为您方便而提供。本政策仅适用于我们的应用。当您使用第三方服务时，您知悉，我们的《DEToken服务协议》、《DEToken隐私政策》将不再适用。我们建议您详细阅读并了解其隐私规则和有关用户服务协议等内容。
          </li>
          <li>
            您有权要求我们更新、更改、删除您的个人信息和撤回您给予我们的同意。如果您希望撤回您曾给予我们的同意，或如您希望更新、更改、删除或访问我们持有的个人信息，或您不接受我们对于本政策的修改，
          </li>
          <li>
            为使您管理由我们持有的个人信息，使您获得有关我们在您提出该等请求前一年内的时间使用（或可能使用）您的个人信息的方式，我们可能向您收取一定的费用。如果我们向您收费，我们将提前告知您收费金额，并在您付费之后满足您的请求。我们将尽力在您提出请求后的三十（30）日内答复您。如果我们无法在三十（30）日内答复，我们将告知您具体的答复时间。
          </li>
          <li>
            在许多情况下，我们需要获得您的个人信息，以使得我们可以向您提供您要求的产品或服务。如您选择拒绝向我们提供我们要求的个人信息或撤回曾给予我们的同意，我们可能无法继续向您提供您要求的产品和服务。
          </li>
        </ul>
        <h2 id="heading-4">
          <strong>四、我们可能分享或传输您的信息</strong
          ><a class="link-anchor" href="#heading-4"></a>
        </h2>
        <ul>
          <li>我们将为业务和法律的目的存储您的个人信息。</li>
          <li>
            未经过您的同意，我们不会向第三方出售、交易或转让您的个人信息。
          </li>
          <li>
            如果您同意我们向战略合作方或关联方披露您的个人信息，我们可能将您的个人信息披露给该等实体。该等实体将仅为您已同意的目的使用您的个人信息。
          </li>
          <li>
            您同意，我们可能向以下第三方披露或共享您的个人信息：
            <ul>
              <li>
                （1）代表我们并向我们提供服务的服务提供商和数据处理方，例如为我们进行KYC检查、会计、数据处理或管理服务、网站托管、维护及运营服务、邮件信息服务、分析服务、支付交易处理、市场营销等；
              </li>
              <li>（2）我们的咨询师和专业顾问（例如会计师、律师、审计师）。</li>
            </ul>
          </li>
          <li>
            如果为了上述的目的，我们需要将您的个人信息传输至任何其他国家，我们将获得您的同意，并且确保个人信息的接收方具备和我们同等级的个人信息保护措施。如果该等国家或地区尚无可适用于我们与您之间关系的个人信息保护法律，我们将与个人信息接收方签订可合法执行的协议。
          </li>
          <li>
            未经您事先同意，本公司不会将您的个人信息向任何第三方共享或转让，但以下情况除外：
            <ul>
              <li>（1）所收集的个人信息是您自行向社会公众公开的；</li>
              <li>
                （2）所收集的个人信息系从合法公开披露的信息中收集，如合法的新闻报道，政府信息公开等渠道；
              </li>
              <li>
                （3）根据适用的法律法规、法律程序的要求、行政机关或司法机关的要求进行提供或执行本政策以保护我们或其他方的权利、财产或安全；
              </li>
              <li>
                （4）在涉及合并、收购时，如涉及到个人信息转让，本公司将要求个人信息接收方继续接受本政策的约束。
              </li>
            </ul>
          </li>
        </ul>
        <h2 id="heading-5">
          <strong>五、自动数据收集技术</strong
          ><a class="link-anchor" href="#heading-5"></a>
        </h2>
        <ul>
          <li>我们在应用中使用自动数据收集技术。例如：</li>
          <li>
            （1）Cookies（或浏览器cookies）。Cookies是网站或应用运营方设置的小型文本文件，以识别您
            的浏览器或设备。我们可能在我们的应用上使用cookies技术存储并跟踪信息，例如用户数量及使用频率、用户分布以及用户的线上偏好。cookies不抓取能够识别您身份的信息，但其收集的信息可协助我们对应用的使用情况进行分析，以提高您的使用体验。您可以在浏览器设置中关闭cookies。但是，这可能影响应用的功能。
          </li>
          <li>
            （2）网络分析。网络分析是收集、评估网页和移动应用访问者行为的一种方法。这包括对流量模式进行分析，例如确定网站或移动应用某部分功能的访问频率，或用以了解访问者最感兴趣的信息或服务。我们的应用使用的是第三方工具提供的网络分析服务。
          </li>
        </ul>
        <h2 id="heading-6">
          <strong>六、我们如何保护您的信息</strong
          ><a class="link-anchor" href="#heading-6"></a>
        </h2>
        <ul>
          <li>
            如本公司停止运营，本公司将停止继续收集您个人信息的活动，并采取措施对所持有的您的个人信息在合理期限内进行删除或匿名化处理。
          </li>
          <li>
            为了保护您的个人信息，本公司将采取数据安全技术措施，提升内部合规水平，增加内部员工信息安全培训，并对相关数据设置安全访问权限等方式安全保护您的隐私信息。
          </li>
          <li>
            我们将在DEToken“消息中心”中向您发送有关信息安全的消息，并不时在DEToken“帮助中心”版块更新钱包使用及信息保护的资料，供您参考。
          </li>
        </ul>
        <h2 id="heading-7">
          <strong>七、对未成年人的保护</strong
          ><a class="link-anchor" href="#heading-7"></a>
        </h2>
        <p>我们对保护未满18周岁的未成年人做出如下特别约定：</p>
        <ul>
          <li>未成年人应当在父母或监护人指导下使用本公司相关服务。</li>
          <li>
            我们建议未成年人的父母和监护人应当在阅读本政策、《DEToken服务协议》及我们的其他有关规则的前提下，指导未成年人使用应用。
          </li>
          <li>
            本应用将根据适用的法律法规的规定保护未成年人的个人信息的保密性及安全性。
          </li>
        </ul>
        <h2 id="heading-8">
          <strong>八、免责声明</strong
          ><a class="link-anchor" href="#heading-8"></a>
        </h2>
        <ul>
          <li>
            您确认，您使用第三方服务之后，本政策将不再适用于该等第三方对您个人信息的收集、使用、披露和传输行为。本公司无法保证该等第三方会采取合理的安全保护措施。
          </li>
          <li>
            您将自行对使用第三方服务的行为承担责任，并且您同意，如第三方收集、使用、披露和传输您个人信息，导致您受到损失或损害的，您不得要求本公司承担责任。
          </li>
          <li>
            您确认并接受，在适用的法律允许的最大限度下，本公司将在现有技术水平条件下，基于“根据现状”、“根据可用”、“不保证无瑕疵”的原则，尽可能采取合理的安全措施保护您的个人信息，以避免信息的泄露、篡改或者毁损。本公司系利用无线方式传输数据，因此，本公司无法确保通过无线网络传输数据的隐私性和安全性。
          </li>
        </ul>
        <h2 id="heading-9">
          <strong>九、其他</strong><a class="link-anchor" href="#heading-9"></a>
        </h2>
        <ul>
          <li>1.本政策自2020年9月20日起适用。</li>
          <li>2.本政策未尽事宜，您需遵守本公司不时更新的公告及相关规则。</li>
        </ul>
      </section>
    </article>
  </body>
</html>

`;

const TermsOfService: FC = () => {
  const intl = useIntl();
  const insets = useSafeAreaInsets();

  // const userAgreementUrl = useHelpLink({ path: 'articles/360002014776' });
  // const privacyPolicyUrl = useHelpLink({ path: 'articles/360002003315' });

  const onOpenUserAgreement = useCallback(() => {
    openUrl(
      { html: userAgreementHtml },
      // userAgreementUrl,
      intl.formatMessage({
        id: 'form__user_agreement',
      }),
      {
        openWebString: true,
        webString: userAgreementHtml,
      },
    );
  }, [intl]);

  const onOpenPrivacyPolicy = useCallback(() => {
    openUrl(
      { html: privacyPolicyHtml },
      // privacyPolicyUrl,
      intl.formatMessage({
        id: 'form__privacy_policy',
      }),
      {
        openWebString: true,
        webString: userAgreementHtml,
      },
    );
  }, [intl]);

  const agreementText = useCallback(
    (text) => (
      <Text
        color="text-subdued"
        onPress={onOpenUserAgreement}
        typography="CaptionUnderline"
      >
        {text}
      </Text>
    ),
    [onOpenUserAgreement],
  );
  const policyText = useCallback(
    (text) => (
      <Text
        color="text-subdued"
        onPress={onOpenPrivacyPolicy}
        typography="CaptionUnderline"
      >
        {text}
      </Text>
    ),
    [onOpenPrivacyPolicy],
  );

  return (
    <Center
      position="absolute"
      bottom={{ base: `${insets.bottom}px`, sm: 8 }}
      w="full"
      pb="16px"
      bgColor="background-default"
    >
      <Text
        maxW={{ base: '300px', sm: 'auto' }}
        mx="auto"
        textAlign="center"
        color="text-subdued"
        typography="Caption"
      >
        {intl.formatMessage(
          { id: 'content__agree_to_user_agreement_and_privacy_policy' },
          {
            a: agreementText,
            b: policyText,
          },
        )}
      </Text>
    </Center>
  );
};

export default TermsOfService;

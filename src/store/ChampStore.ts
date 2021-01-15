import { action, observable, runInAction } from 'mobx';
import api from 'api/modules/riotApi';
import { champProps } from 'types/champStore.type';
import { AxiosResponse } from 'axios';
import { AllChampionResponse, runeResponse, spellResponse } from 'types/champStore.type';

class ChampStore implements champProps {
  @observable champs = [{ id: 0, name: 'champ' }];
  @observable rune = [{ id: 1, name: '', img: '' }];
  @observable spell = [{ id: 0, name: 'SummonerBarrier' }];
  @observable ddragonVersion = '';
  @observable champLoading = false;

  @action getAllChamps = async () => {
    try {
      this.champLoading = true;
      const version = await api.getDdrgonVersion();
      this.ddragonVersion = version.data[0];

      const promiseSet: [
        Promise<AxiosResponse<AllChampionResponse>>,
        Promise<AxiosResponse<runeResponse[]>>,
        Promise<AxiosResponse<spellResponse>>,
      ] = [api.getChampionInfo(this.ddragonVersion), api.getRunInfo(this.ddragonVersion), api.getSpellInfo(this.ddragonVersion)];

      const resAll = await Promise.all(promiseSet);

      const runeArray: { id: number; name: string; img: string }[] = [];
      resAll[1].data.forEach(major => {
        runeArray.push({ id: major.id, name: major.icon, img: major.icon });
        major.slots.forEach(nest =>
          nest.runes.forEach(miner => {
            runeArray.push({ id: miner.id, name: miner.icon, img: miner.key });
          }),
        );
      });

      runInAction(() => {
        // 이거 별로인듯 객체로 바꾸고, userStore -> const champInfo = this.champStore.champs.find(champ => champ.id === el.championId); 이부분 수정
        this.champs = Object.entries(resAll[0].data.data).map(([key, value]) => ({ id: Number(value.key), name: key }));
        this.spell = Object.entries(resAll[2].data.data).map(([k, v]) => ({ id: Number(v.key), name: k }));
        this.rune = runeArray;
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.champLoading = false;
    }
  };
}

export default ChampStore;

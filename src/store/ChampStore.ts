import { action, observable, runInAction } from 'mobx';
import api from 'api/modules/riotApi';
import { champProps } from 'types/champStore.type';
class ChampStore implements champProps {
  @observable champs = [{ id: 0, name: 'champ' }];
  @observable ddragonVersion = '';
  @observable champLoading = false;

  @action getAllChamps = async () => {
    // todo: spell, rune 정보 가져와야함
    try {
      this.champLoading = true;
      const version = await api.getDdrgonVersion();
      this.ddragonVersion = version.data[0];
      const res = await api.getChampionInfo(version.data[0]);
      runInAction(() => {
        this.champs = Object.entries(res.data.data).map(([key, value]) => {
          return { id: Number(value.key), name: key };
        });
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.champLoading = false;
    }
  };
}

export default ChampStore;
